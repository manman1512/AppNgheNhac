import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import playlistsApi from '../../axiosClient/api/playlists';
import { Context } from '../../store/Context';
import { format } from 'date-fns';
import {
  BsFileEarmarkMusic,
  BsFillPlayCircleFill,
  BsHeartFill,
  BsThreeDots,
} from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import songsApi from '../../axiosClient/api/songs';
import { RxDot } from 'react-icons/rx';
const moment = require('moment');
require('moment/locale/vi'); // Load Vietnamese locale

export default function DetailPlaylist() {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  // console.log(location);
  const PF = process.env.REACT_APP_SERVER_URL;
  const [playlist, setPlaylist] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [listSongs, setListSongs] = useState('');
  const [suggestSongs, setSuggestsongs] = useState([]);

  useEffect(() => {
    const getPlaylistByUser = async () => {
      const res = await playlistsApi.getPlaylistById(path);
      setPlaylist(res.data.playLists);
      setListSongs(res.data.playLists.listSong);
      // console.log(res.data.playLists.listSong.length);
      setFormattedDate(
        format(new Date(res.data.playLists.updatedAt), 'dd/MM/yyyy')
      );
      // console.log(formattedDate);
    };
    getPlaylistByUser();
  }, [path]);

  useEffect(() => {
    const getAllSong = async () => {
      const songs = await songsApi.getAllSong();
      console.log(songs);
      setSuggestsongs(songs.data);
    };
    getAllSong();
  }, []);
  return (
    <React.Fragment>
      <div className="p-7 flex gap-4">
        <div class="grid grid-rows-3 grid-flow-col gap-4">
          <div class="">
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
                <BsFillPlayCircleFill
                  color="white"
                  className="text-[28px] hover:scale-150 cursor-pointer"
                  title={playlist.title}
                />
                <BsThreeDots
                  color="white"
                  className="text-[28px] hover:scale-150 cursor-pointer"
                  title="Khác"
                />
              </div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <div className="mt-2 font-bold text-xl">{playlist?.title}</div>
              <div className="mt-2 text-sm">Cập nhật: {formattedDate}</div>
              <div className="flex items-center mt-2">
                <img
                  className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                  src={
                    state.user?.profilePic
                      ? `${PF}/images/${state.user.profilePic}`
                      : 'https://picsum.photos/40'
                  }
                  alt=""
                />
                <p className="ml-1 truncate font-bold">
                  {state.user?.displayName}
                </p>
                <RxDot className="mt-1" />
                <p className="text-sm">{ playlist?.listSong?.length} bài hát</p>
              </div>
            </div>
          </div>
        </div>
        {listSongs.length === 0 ? (
          <div className="flex flex-auto w-auto flex-col gap-7">
            <div
              className="flex justify-center items-center flex-col bg-[#AEE9C5] p-10 
            rounded-lg text-white"
            >
              <BsFileEarmarkMusic size="5rem" />
              <p className="font-bold mt-2 text-lg">
                Không có bài hát trong playlist này
              </p>
            </div>
            <div className="">
              <div className="font-bold text-lg ml-36 mb-3">Bài hát gợi ý</div>
              <div className="flex flex-col items-center justify-center">
                <div>
                  {suggestSongs.map((s, i) => (
                    <tr key={i}>
                      <td className="px-20 py-2">
                        <div className="flex items-center">
                          <img
                            src={s.thumbnail}
                            alt=""
                            className="w-[35px] h-[35px] rounded-lg mr-2"
                          />
                          {s.name}
                        </div>
                      </td>
                      <td className="px-20 py-2">Madihu</td>
                      <td className="px-20 py-2">
                        <BsHeartFill
                          className="cursor-pointer"
                          title="Xóa khỏi mục yêu thích"
                        />
                      </td>
                    </tr>
                  ))}
                </div>
              </div>
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
                {listSongs.map((l, i) => (
                  <tr key={i}>
                    <th scope="row" className="px-6 py-2">
                      <div className="flex items-center">
                        <div className="visible group-hover:invisible">
                          {i + 1}
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
      </div>
    </React.Fragment>
  );
}
