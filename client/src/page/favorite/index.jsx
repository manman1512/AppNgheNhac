import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiHeartCircle } from 'react-icons/bi';
import { RiHeartAddLine, RiUserVoiceLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import {
  BsDot,
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';
import {
  ImVolumeHigh,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
} from 'react-icons/im';
// import Lyrics from './lyrics';
import { RxDot } from 'react-icons/rx';
import { MdSkipNext } from 'react-icons/md';
import { IoMdSkipBackward } from 'react-icons/io';
import { BsHeartFill } from 'react-icons/bs';
import { HiPlay } from 'react-icons/hi';
import { Context } from '../../components/store/Context';
import loveSongApi from '../../axiosClient/api/loveSong';

export default function Favorite() {
  const [state, dispatch] = useContext(Context);
  const [loveSongs, setLoveSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songDuration, setSongDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);
  const [tempVolume, setTempVolume] = useState(volume);
  const [isMouseKeep, setIsMouseKeep] = useState(false);

  const songRef = useRef(null); // chỉ sử dụng giá trị khởi tạo(null) trong lần dầu tiên
  // luôn return object có properties -> current
  // (MUỐN LẤY GIÁ TRỊ PHẢI .current)
  useEffect(() => {
    const getLoveSongByUser = async () => {
      const res = await loveSongApi.getLoveSongByUser();
      setLoveSongs(res.data.lovesong);
      console.log('🚀 ~ file: index.jsx:  23 ~ getLoveSongByUser ~ res:', res);
      // console.log(state)
    };
    getLoveSongByUser();
  }, []);

  const onSongClick = (song) => {
    // setPlayer(true);
    // console.log(song);
    setSelectedSong(song);
  };
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
  useEffect(() => {
    if (Math.round(songDuration) === currentTime) {
      setIsPlay(false);
    }
  }, [songDuration, currentTime]);
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
    // console.log(loveSongs, selectedSong);
  }, [selectedSong]);
  return (
    <div>
      {state.user && (
        <div className="flex flex-col w-full gap-20">
          <div className="p-8 bg-[#7ac799] text-white">
            <div className="flex items-center  ">
              <BiHeartCircle size="6rem" color="" />
              <p className="text-5xl font-bold text-purple">
                Bài hát yêu thích
              </p>
            </div>
            <div className="ml-20 flex items-center">
              <img
                className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                src="https://picsum.photos/40"
                alt=""
              />
              <p className="ml-1 truncate font-bold">
                {state.user.data.User.displayName}
              </p>
              <RxDot className="mt-1" />
              <p className="text-sm">{state.user.data.User.loveSong.length} bài hát</p>
            </div>
          </div>
          {state.user.data.User.loveSong.length === 0 ? (
            <div className="flex flex-col justify-between items-center">
              <div className="text-3xl font-bold text-purple mb-4">
                Bạn chưa có bài hát yêu thích nào
              </div>
              <div className="font-bold text-purple mb-4">
                Hãy lưu bài hát bằng cách nhắn vào biểu tượng trái tim
              </div>
              <div className='border border-black rounded-xl'>
                <Link to= "/" className="flex items-center p-2">
                  <RiHeartAddLine className='mr-1'/>
                  <p>Thêm bài hát</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-left ">
                <thead className="text-lg">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bài hát
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nghệ sĩ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loveSongs.map((l, i) => (
                    <tr
                      className={`border-b ${
                        l && selectedSong && l._id === selectedSong._id
                          ? 'bg-[#aee9c5]'
                          : 'transparent '
                      } hover:bg-[#aee9c5] group`}
                      key={i}
                    >
                      <th scope="row" className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="visible group-hover:invisible">
                            {i + 1}
                          </div>
                          <div className="bg-transparent -translate-x-5 right-0 z-50">
                            {l && selectedSong && l._id === selectedSong._id ? (
                              <button
                                onClick={() => {
                                  onSongClick(l);
                                }}
                              >
                                <BsFillPauseCircleFill
                                  className="invisible group-hover:visible"
                                  size="2rem"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  onSongClick(l);
                                }}
                              >
                                <HiPlay
                                  className="invisible group-hover:visible"
                                  size="2rem"
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-2">
                        <div className="flex items-center">
                          <img
                            src={l.thumbnail}
                            alt=""
                            className="w-[35px] h-[35px] rounded-lg mr-2"
                          />
                          {l.name}
                        </div>
                      </td>
                      <td className="px-6 py-2">Madihu</td>
                      <td className="px-6 py-2">
                        <BsHeartFill
                          className="cursor-pointer"
                          title="Xóa khỏi mục yêu thích"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedSong ? (
            <div
              className=" h-20 flex items-center border
            bg-[#1c1c1c]"
            >
              <div className="flex items-center ml-2 flex-1">
                <div className="mr-4 ">
                  <img
                    className="w-[50px] h-[50px] rounded-xl"
                    src={selectedSong.thumbnail}
                    alt=""
                  />
                </div>
                <div className="text-white">
                  <div className="font-bold">{selectedSong.name}</div>
                  <div className="flex items-center">
                    <RiUserVoiceLine />
                    <div className="ml-1">
                      {selectedSong.artist ? selectedSong.artist.name : 'Null'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center flex-1">
                <div className="flex items-center">
                  <IoMdSkipBackward
                    size="1.2rem"
                    color="white"
                    className="mr-5"
                  />
                  {!isPlay ? (
                    <button
                      onClick={() => {
                        if (songRef.current) {
                          songRef.current.play();
                          setIsPlay(true);
                          if (currentTime === Math.round(songDuration)) {
                            setCurrentTime(0);
                            songRef.current.play();
                          }
                        }
                      }}
                    >
                      <BsFillPlayCircleFill color="white" size="2rem" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (songRef.current) {
                          songRef.current.pause();
                          setIsPlay(false);
                        }
                      }}
                    >
                      <BsFillPauseCircleFill color="white" size="2rem" />
                    </button>
                  )}
                  <MdSkipNext size="1.8rem" color="white" className="ml-3" />
                </div>

                <audio
                  onLoadedMetadata={() => {
                    if (songRef.current) {
                      setSongDuration(songRef.current.duration);
                    }
                  }}
                  ref={songRef}
                  src={selectedSong.link}
                  loop
                ></audio>

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
                      defaultValue={0}
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
                        if (
                          (+e.target.value / 100) * songDuration <
                          songDuration
                        ) {
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
              <div className=" mr-4 flex-1  ">
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
                  <div className=" bg-gray-50 shadow-xl invisible group-hover:visible p-1 flex py-2 rounded-lg -left-2/3 translate-x-2 -top-8 -translate-y-3/4 -rotate-90 absolute">
                    <input
                      value={volume}
                      onChange={(e) => {
                        setVolume(e.target.value);
                        setTempVolume(e.target.value);
                        console.log(e.target.value);
                        if (+e.target.value === 0) {
                          setMute(true);
                        } else {
                          setMute(false);
                        }
                      }}
                      type="range"
                      className=" accent-gray-300 w-20 h-1 form-range focus:outline-none focus:ring-0 focus:shadow-none
              bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}
