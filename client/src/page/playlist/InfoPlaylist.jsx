import { format } from 'date-fns';
import React, { useContext } from 'react';
import { BsFillPlayCircleFill, BsThreeDots } from 'react-icons/bs';
import { RxDot } from 'react-icons/rx';
import { TiDeleteOutline } from 'react-icons/ti';
import { Context } from '../../store/Context';
import { AiOutlineEdit } from 'react-icons/ai';

export default function InfoPlaylist({ playlist, onOpen, length, user }) {
  const PF = process.env.REACT_APP_SERVER_URL;
  // console.log(playlist);
  return (
    <React.Fragment>
      {playlist && (
        <React.Fragment>
          {' '}
          <div
            style={{
              backgroundImage: `url(${
                playlist.thumbnail
                  ? `${PF}/images/${playlist.thumbnail}`
                  : 'https://picsum.photos/200'
              })`,
            }}
            className={`
            mx-auto bg-center w-80 group relative rounded-xl transition-all duration-500 
            hover:scale-105 h-80 bg-cover
            `}
          >
            <div
              className="absolute invisible group-hover:visible -bottom-52 group-hover:bottom-10 transition-all 
              duration-500 p-4 flex gap-4 left-1/2 -translate-x-1/2 justify-center"
            >
              <TiDeleteOutline
                color="white"
                className="text-[33px] hover:scale-150 cursor-pointer"
                title="Xóa"
              />
              <BsFillPlayCircleFill
                color="white"
                className="text-[28px] hover:scale-150 cursor-pointer"
                title={playlist.title}
              />

              <AiOutlineEdit
                color="white"
                className="text-[28px] hover:scale-150 cursor-pointer"
                title="Chỉnh sửa"
                onClick={() => {
                  onOpen();
                }}
              />
            </div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <div className="mt-2 font-bold text-xl w-[300px] break-words items-center flex justify-center">
              {playlist.title}
            </div>
            <div className="mt-2 text-sm">
              Cập nhật: {format(new Date(playlist.updatedAt), 'dd/MM/yyyy')}
            </div>
            <div className="flex items-center mt-2">
              <img
                className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                src={
                  user.profilePic
                    ? `${PF}/images/${user.profilePic}`
                    : 'https://picsum.photos/40'
                }
                alt=""
              />
              <p className="ml-1 truncate font-bold">{user.displayName}</p>
              <RxDot className="mt-1" />
              <p className="text-sm">{length} bài hát</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
