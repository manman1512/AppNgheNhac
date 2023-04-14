import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { BsFillPauseCircleFill } from 'react-icons/bs';
import { ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';
import { RiUserVoiceLine } from 'react-icons/ri';
import { IoMdSkipBackward } from 'react-icons/io';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { MdSkipNext } from 'react-icons/md';
import { togglePlay } from '../../store/Action';
import { Context } from '../../store/Context';

export default function Player() {
  const [state, dispatch] = useContext(Context);
  const songRef = useRef();
  const { player: { selectedSong, isPlay } } = state;
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(100);
  const [tempVolume, setTempVolume] = useState(0);
  const [isMouseKeep, setIsMouseKeep] = useState(false)
  useEffect(() => {
    if (songRef.current) {
      if (isPlay) {
        songRef.current.play();
      } else {
        songRef.current.pause();
      }
    }
  }, [songRef, isPlay])
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
      dispatch(togglePlay());
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
    <div
      className=" h-20 flex items-center border
        bg-[#1c1c1c] fixed bottom-0 w-[calc(100%-11.5 rem)] px-4"
    >
      <div className="flex items-center w-[20%]">
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
      <div className="flex flex-col justify-center items-center w-[60%]">
        <div className="flex items-center">
          <IoMdSkipBackward size="1.2rem" color="white" className="mr-5" />
          {!isPlay ? (
            <button
              onClick={() => {
                if (songRef.current) {
                  if (currentTime === Math.round(songDuration)) {
                    setCurrentTime(0);
                  }
                  dispatch(togglePlay())
                }
              }}
            >
              <BsFillPlayCircleFill color="white" size="2rem" />
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch(togglePlay())
              }

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
      <div className="w-[20%]">
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
