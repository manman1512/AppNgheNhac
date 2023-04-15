import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { BsFillPauseCircleFill } from 'react-icons/bs';
import {
  ImVolumeHigh,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
} from 'react-icons/im';
import { RiUserVoiceLine } from 'react-icons/ri';
import { IoMdSkipBackward } from 'react-icons/io';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  handlePlay,
  handleSetRepeat,
  setSelectedSong,
  togglePlay,
  updateLinkSong,
} from '../../store/Action';
import { Context } from '../../store/Context';
import songsApi from '../../axiosClient/api/songs';
import { PLAYER_TYPE, REPEAT } from '../../store/Constant';
import { TbRepeatOnce, TbRepeatOff, TbRepeat } from 'react-icons/tb';

export default function Player() {
  const [state, dispatch] = useContext(Context);
  const songRef = useRef();
  const {
    player: { selectedSong, isPlay },
  } = state;
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(100);
  const [tempVolume, setTempVolume] = useState(0);
  const [isMouseKeep, setIsMouseKeep] = useState(false);
  useEffect(() => {
    if (songRef.current) {
      if (isPlay) {
        songRef.current.play();
      } else {
        songRef.current.pause();
      }
    }
  }, [songRef, isPlay]);
  useEffect(() => {
    const x = setInterval(() => {
      if (isPlay && songRef) {
        setCurrentTime((prev) => {
          if (prev < Math.round(songDuration))
            return prev + 1; //Math.round() => làm tròn
          else return prev;
        });
      }
    }, 1000);
    return () => clearInterval(x);
  }, [isPlay, songDuration, songRef]);
  useEffect(()=>{
    if(songDuration === 0 && state.player.selectedSong){
      dispatch(handlePlay())
    }
  },[songDuration, state.player.selectedSong])
  useEffect(() => {
    if(songDuration > 0)
    {if (Math.round(songDuration) === currentTime) {
      if (state.player.repeat === REPEAT.NONE) {
        dispatch(togglePlay());
      } else {
        if (state.player.repeat === REPEAT.ALL) {
          if (state.player.type === PLAYER_TYPE.PLAYLIST) {
            const playlist = state.playlist.find(
              (p) => p._id === state.player.playlist
            );
            console.log(
              '🚀 ~ file: index.jsx:71 ~ useEffect ~ playlist:',
              playlist
            );
            if (playlist) {
              const index = playlist.listSong.findIndex(
                (song) => song._id === selectedSong._id
              );
              const listSongLength = playlist.listSong.length;
              if (index !== -1) {
                if (index === listSongLength - 1) {
                  dispatch(setSelectedSong(playlist.listSong[0]));
                } else {
                  dispatch(setSelectedSong(playlist.listSong[index + 1]));
                }
              }
            }
          } else if (state.player.type === PLAYER_TYPE.LOVESONG) {
            const loveSong = state.loveSong;
            const index = loveSong.findIndex((s) => s._id === selectedSong._id);
            if (index !== -1) {
              if (index === loveSong.length - 1) {
                dispatch(setSelectedSong(loveSong[0]));
              } else {
                dispatch(setSelectedSong(loveSong[index + 1]));
              }
            }
          }else{
            setCurrentTime(0)
          }
        }
        if (state.player.repeat === REPEAT.ONE) {
          setCurrentTime(0);
        }
      }
    }}
  }, [songDuration, currentTime, state.player.repeat]);
  useEffect(() => {
    if (songDuration > 0 && !isMouseKeep) {
      setProgress((currentTime / songDuration) * 100);
    }
  }, [currentTime, isMouseKeep]);
  useEffect(() => {
    if (songRef.current) {
      if (isPlay) {
        songRef.current.play();
      } else {
        songRef.current.pause();
      }
    }
  }, [selectedSong, songRef, isPlay]);
  useEffect(() => {
    setCurrentTime(0);
  }, [selectedSong]);
  useEffect(()=>{
    const current = songRef.current;
    if(current && currentTime === 0){
      current.currentTime = 0;
    }
  },[currentTime, songRef.current])
  useEffect(() => {
    if (songRef.current) {
      songRef.current.volume = volume / 100;
    }
  }, [volume, songRef]);
  useEffect(() => {
    if (songRef.current) {
      songRef.current.mute = mute;
    }
  }, [mute, songRef]);

  useEffect(() => {
    console.log(state.player);
  }, [state]);
  useEffect(() => {
    (async () => {
      if (selectedSong.link === undefined) {
        const response = await songsApi.getLinkSong(selectedSong.id);
        const link = response.data.data['128'];
        dispatch(updateLinkSong(selectedSong._id, link));
        dispatch(
          setSelectedSong({
            ...selectedSong,
            link,
          })
        );
      }
    })();
  }, [selectedSong]);
  const handleSkipNext = () => {
    if (state.player.type !== PLAYER_TYPE.ONE) {
      if (state.player.type === PLAYER_TYPE.PLAYLIST) {
        const playlist = state.playlist.find(
          (p) => p._id === state.player.playlist
        );
        if (playlist) {
          const listSong = playlist.listSong;
          if (listSong.length > 0) {
            const index = listSong.findIndex(
              (s) => s._id === state.player.selectedSong._id
            );
            if (index !== -1) {
              if (index === listSong.length - 1) {
                dispatch(setSelectedSong(listSong[0]));
              } else {
                dispatch(setSelectedSong(listSong[index + 1]));
              }
            }
          }
        }
      }
      if (state.player.type === PLAYER_TYPE.LOVESONG) {
        const index = state.loveSong.findIndex(s => s._id === selectedSong._id)
        if (index !== -1) {
          if (index === state.loveSong.length - 1) {
            dispatch(setSelectedSong(state.loveSong[0]));
          } else {
            dispatch(setSelectedSong(state.loveSong[index + 1]));
          }
        }
      }
    }
  };
  const hanldeSkipPrevios = () => {
    if (state.player.type !== PLAYER_TYPE.ONE) {
      if (state.player.type === PLAYER_TYPE.PLAYLIST) {
        const playlist = state.playlist.find(
          (p) => p._id === state.player.playlist
        );
        if (playlist) {
          const listSong = playlist.listSong;
          if (listSong.length > 0) {
            const index = listSong.findIndex(
              (s) => s._id === state.player.selectedSong._id
            );
            if (index !== -1) {
              if (index === 0) {
                setCurrentTime(0);
              } else {
                dispatch(setSelectedSong(listSong[index - 1]));
              }
            }
          }
        }
      }
      if (state.player.type === PLAYER_TYPE.LOVESONG) {
        const index = state.loveSong.findIndex(s => s._id === selectedSong._id)
        if (index !== -1) {
          if (index === 0) {
            setCurrentTime(0);
          } else {
            dispatch(setSelectedSong(state.loveSong[index - 1]));
          }
        }
      }
    }
  };
  return (
    <div
      className=" h-20 flex items-center border
  bg-[#1c1c1c] fixed bottom-0 w-[calc(100%-11.5rem)] px-4 justify-between"
    >
      <div className="flex items-center gap-2 flex-1">
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundSize: '50px 50px',
            backgroundImage: `url(${selectedSong.thumbnail})`,
            borderRadius: '100%',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="text-white">
          <div className="font-bold line-clamp-2">{selectedSong.name}</div>
          <div className="flex items-center">
            <RiUserVoiceLine />
            <div className="ml-1">
              {selectedSong.artist ? selectedSong.artist.name : 'Null'}
            </div>
          </div>
        </div>
      </div>
      {
        <div className="flex flex-col justify-center items-center w-[60%] flex-[2]">
          <div className="flex items-center">
            <button className="disabled:cursor-default" disabled={state.player.type === PLAYER_TYPE.ONE} onClick={hanldeSkipPrevios}>
              <MdSkipPrevious size="1.8rem" color="white" />
            </button>
            {!isPlay ? (
              <button
                onClick={() => {
                  if (songRef.current) {
                    if (currentTime === Math.round(songDuration)) {
                      setCurrentTime(0);
                    }
                    dispatch(togglePlay());
                  }
                }}
              >
                <BsFillPlayCircleFill color="white" size="2rem" />
              </button>
            ) : (
              <button onClick={() => dispatch(togglePlay())}>
                <BsFillPauseCircleFill color="white" size="2rem" />
              </button>
            )}
            <button className="disabled:cursor-default" disabled={state.player.type === PLAYER_TYPE.ONE} onClick={handleSkipNext}>
              <MdSkipNext size="1.8rem" color="white" />
            </button>
            <div className="ml-2">
              {state.player.repeat === REPEAT.ONE && (
                <button onClick={() => dispatch(handleSetRepeat(REPEAT.ALL))}>
                  <TbRepeatOnce
                    title="Phát lại tất cả"
                    size="1.5rem"
                    className="text-blue-300 "
                  />
                </button>
              )}
              {state.player.repeat === REPEAT.NONE && (
                <button onClick={() => dispatch(handleSetRepeat(REPEAT.ONE))}>
                  <TbRepeatOff title="Phát 1 bài" size="1.5rem" color="white" />
                </button>
              )}
              {state.player.repeat === REPEAT.ALL && (
                <button onClick={() => dispatch(handleSetRepeat(REPEAT.NONE))}>
                  <TbRepeat
                    title="Tắt phát lại"
                    size="1.5rem"
                    className="text-blue-300 "
                  />
                </button>
              )}
            </div>
          </div>

          {selectedSong.link && (
            <audio
              onLoadedMetadata={() => {
                if (songRef.current) {
                  setSongDuration(songRef.current.duration);
                }
              }}
              ref={songRef}
              src={selectedSong.link}
              loop={state.player.repeat === REPEAT.ONE ? true : false}
            ></audio>
          )}

          <div className="flex text-white">
            <div className="mt-1 mr-3">
              {new Date(currentTime * 1000).toISOString().slice(11, 19)}
            </div>
            <div>
              <input
                id="customRange1"
                type="range"
                value={progress}
                min="0"
                max="100"
                onMouseDown={() => setIsMouseKeep(true)}
                onMouseUp={(e) => {
                  if (songRef.current && e.target.value < songDuration) {
                    songRef.current.currentTime = Math.floor(
                      (e.target.value / 100) * songDuration
                    );
                    setCurrentTime(
                      Math.ceil((e.target.value / 100) * songDuration)
                    );
                  }
                  setIsMouseKeep(false);
                }}
                onChange={(e) => {
                  if ((+e.target.value / 100) * songDuration < songDuration) {
                    setProgress(e.target.value);
                  }
                }}
                className="accent-white w-full h-1 bg-transparent focus:outline-none focus:ring-0
          focus:shadow-none bg-gray-200 rounded-lg "
              />
            </div>
            <div className="mt-1 ml-3">
              {new Date(songDuration * 1000).toISOString().slice(11, 19)}
            </div>
          </div>
        </div>
      }
      <div className="flex-1">
        <div className="ml-auto w-16 relative group">
          {!mute ? (
            <button
              onClick={() => {
                setMute(true);
                setTempVolume(volume);
                setVolume(0);
              }}
            >
              {volume > 80 ? (
                <ImVolumeHigh
                  size="1.2rem"
                  color="white"
                  className="mr-1 mt-2"
                />
              ) : volume > 30 ? (
                <ImVolumeMedium
                  size="1.2rem"
                  color="white"
                  className="mr-1 mt-2"
                />
              ) : (
                <ImVolumeLow
                  size="1.2rem"
                  color="white"
                  className="mr-1 mt-2"
                />
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setMute(false);
                setVolume(tempVolume);
              }}
            >
              <ImVolumeMute2
                size="1.2rem"
                color="white"
                className="mr-1 mt-2"
              />
            </button>
          )}{' '}
          <div
            className=" bg-gray-50 shadow-xl invisible group-hover:visible p-1 flex py-2 
        rounded-lg -left-2/3 translate-x-2 -top-8 -translate-y-3/4 -rotate-90 absolute"
          >
            <input
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                setTempVolume(e.target.value);
                if (+e.target.value === 0) {
                  setMute(true);
                } else {
                  setMute(false);
                }
              }}
              type="range"
              className=" accent-gray-300 w-20 h-1 form-range focus:outline-none focus:ring-0 
            focus:shadow-none bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm
            dark:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
