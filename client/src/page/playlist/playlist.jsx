import React from 'react';
import { BsFillPlayCircleFill, BsHeart, BsThreeDots } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';

export default function Playlist({ playlist }) {
  const PF = process.env.REACT_APP_SERVER_URL;
  return (
    <React.Fragment>
      <div className="ml-4">
        <div className="flex gap-4 flex-wrap py-4 justify-start w-full flex-col">
          <div
            style={{
              backgroundImage: `url(${
                playlist.thumbnail
                  ? `${PF}/images/${playlist.thumbnail}`
                  : 'https://picsum.photos/400'
              })`,
            }}
            className={`
            mx-auto bg-center w-[200px] group relative rounded-xl transition-all duration-500 
            hover:scale-105 h-60 bg-cover
            `}
          >
            <div className="w-full h-full group-hover:backdrop-brightness-90 rounded-xl"></div>
            <div
              className="absolute invisible group-hover:visible -bottom-52 group-hover:bottom-10 transition-all 
                duration-500 p-4 flex gap-4 left-1/2 -translate-x-1/2 justify-center"
            >
              <TiDeleteOutline
                color="white"
                className="text-[33px] hover:scale-150 cursor-pointer"
                title="Xóa"
              />
              <Link className="" to={`/playlist/${playlist._id}`}>
                <BsFillPlayCircleFill
                  color="white"
                  className="text-[28px] hover:scale-150 cursor-pointer"
                  title={playlist.title}
                />
              </Link>
              <BsThreeDots
                color="white"
                className="text-[28px] hover:scale-150 cursor-pointer"
                title="Khác"
              />
            </div>
          </div>
          <div className="mt-2 font-bold text-center">{playlist.title}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
