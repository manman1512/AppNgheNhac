import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import playlistsApi from '../../axiosClient/api/playlists';
import { Context } from '../../store/Context';
import { format } from 'date-fns';
import {
  BsFileEarmarkMusic,
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsHeartFill,
  BsThreeDots,
} from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { AiOutlineHeart } from 'react-icons/ai';
import songsApi from '../../axiosClient/api/songs';
import { RxDot } from 'react-icons/rx';
import { FiEdit2 } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';
import { HiPlay } from 'react-icons/hi';
import RenderListSong from '../../components/RenderListSong';
import EditPlaylist from './EditPlaylist';
import InfoPlaylist from './InfoPlaylist';
const moment = require('moment');
require('moment/locale/vi'); // Load Vietnamese locale

export default function DetailPlaylist() {
  const [state, dispatch] = useContext(Context);

  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [playlist, setPlaylist] = useState([]);
  const [listSong, setListSong] = useState([]);
  const [suggestSongs, setSuggestsongs] = useState([]);
  const [showModalEditPlaylist, setShowModalEditPlaylist] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const handleCloseModal = ()=>{
    setShowModalEditPlaylist(false);
  }
  const handleApplyChange = ()=>{

  }
  const onSongClick = (song) => {
    setSelectedSong(song);
  };
  useEffect(() => {
    const getPlaylistByUser = async () => {
      const res = await playlistsApi.getPlaylistById(path);
      setPlaylist(res.data.playlist);
      setListSong(res.data.listSong);
    };
    getPlaylistByUser();
  }, [path]);

  useEffect(() => {
    const getAllSong = async () => {
      const songs = await songsApi.getAllSong();
      setSuggestsongs(songs.data);
    };
    getAllSong();
  }, []);
  const handleOpenModal = ()=>{
    setShowModalEditPlaylist(true)
  }
  return (
    <React.Fragment>
      <div className="p-8 flex gap-8">
        <div className="gap-4">
          {
            state.user && playlist && listSong.length > 0 && <InfoPlaylist playlist={playlist
            } onOpen={handleOpenModal} length={listSong.length} user={state.user}/>
          }
          {showModalEditPlaylist && (
            <EditPlaylist
              onApply={handleApplyChange}
              onClose={handleCloseModal}
              playlist={playlist}
            />
          )}
        </div>
        {listSong.length === 0 ? (
          <div className="flex flex-auto w-auto flex-col gap-[67px]">
            <div
              className="flex justify-center items-center flex-col bg-[#AEE9C5] p-14
            rounded-lg text-white"
            >
              <BsFileEarmarkMusic size="5rem" />
              <p className="font-bold mt-2 text-lg">
                Không có bài hát trong playlist này
              </p>
            </div>
            <div className="">
              <div className="font-bold text-xl mb-3">Bài hát gợi ý</div>
              <div className="flex flex-col ">
                <table>
                  <tbody>
                    {suggestSongs.map((s, i) => (
                      <tr key={i} className="">
                        <td className=" py-2">
                          <div className="flex items-center">
                            <img
                              src={s.thumbnail}
                              alt=""
                              className="w-[35px] h-[35px] rounded-lg mr-2"
                            />
                            {s.name}
                          </div>
                        </td>
                        <td className="px-24 py-2">Nghe si</td>
                        <td className="px-24 py-2 visible">
                          <IoIosAdd
                            className="cursor-pointer border border-gray-400 rounded-full"
                            color="black"
                            size="1.2rem"
                            title="Thêm vào playlist"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) :    
         <RenderListSong listSong={listSong} onSongClick={onSongClick} selectedSong={selectedSong} />
      }      
        </div>
    </React.Fragment>
  )
}
