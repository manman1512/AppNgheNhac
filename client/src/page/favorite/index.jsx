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
import { Context } from '../../store/Context';
import loveSongApi from '../../axiosClient/api/loveSong';

import RenderListSong from "../../components/RenderListSong"
import { setSelectedSong } from '../../store/Action';

export default function Favorite() {

  const [state, dispatch] = useContext(Context);
  const loveSongs = state.loveSong;
  const [songDuration, setSongDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);
  const [tempVolume, setTempVolume] = useState(volume);
  const [isMouseKeep, setIsMouseKeep] = useState(false);
  const PF = process.env.REACT_APP_SERVER_URL;
  const [number, setNumber] = useState('')

  const onSongClick = (song) => {
    // setPlayer(true);
    // console.log(song);
    dispatch(setSelectedSong(song));
  };

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
                src={
                  state.user.profilePic
                    ? `${PF}/images/${state.user.profilePic}`
                    : 'https://picsum.photos/40'
                }
                alt=""
              />
              <p className="ml-1 truncate font-bold">
                {state.user.displayName}
              </p>
              <RxDot className="mt-1" />
              <p className="text-sm">{number} bài hát</p>
            </div>
          </div>
          {state.user.loveSong.length === 0 ? (
            <div className="flex flex-col justify-between items-center">
              <div className="text-3xl font-bold text-purple mb-4">
                Bạn chưa có bài hát yêu thích nào
              </div>
              <div className="font-bold text-purple mb-4">
                Hãy lưu bài hát bằng cách nhắn vào biểu tượng trái tim
              </div>
              <div className='border border-black rounded-xl'>
                <Link to="/" className="flex items-center p-2">
                  <RiHeartAddLine className='mr-1' />
                  <p>Thêm bài hát</p>
                </Link>
              </div>
            </div>
          ) : <RenderListSong onSongClick={onSongClick} listSong={loveSongs} />}


        </div>
      )}
    </div>
  );
}
