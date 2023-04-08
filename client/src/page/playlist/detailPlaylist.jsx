import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import playlistsApi from '../../axiosClient/api/playlists';
import { Context } from '../../store/Context';
import { format } from 'date-fns';
import { BsFileEarmarkMusic } from 'react-icons/bs';

import songsApi from '../../axiosClient/api/songs';

import { IoIosAdd } from 'react-icons/io';
import RenderListSong from '../../components/RenderListSong';
import EditPlaylist from './EditPlaylist';
import InfoPlaylist from './InfoPlaylist';
import { setPlaylist } from '../../store/Action';
import AddSongOnPlaylist from './AddSongOnPlaylist';
const moment = require('moment');
require('moment/locale/vi'); // Load Vietnamese locale

export default function DetailPlaylist(props) {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [listSong, setListSong] = useState([]);
  const [suggestSongs, setSuggestsongs] = useState([]);
  const [showModalEditPlaylist, setShowModalEditPlaylist] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [show, setShow] = useState(false);
  const handleCloseModal = () => {
    setShowModalEditPlaylist(false);
  };
  const handleAdd = () => {
    // console.log(props);
    setShow(true);
    
  };
  const onSongClick = (song) => {
    setSelectedSong(song);
  };
  useEffect(() => {
    // console.log("xyz2")
  }, []);

  useEffect(() => {
    dispatch({ type: 'UPDATE_PLAYLIST' });
    const getPlaylistByUser = async () => {
      const res = await playlistsApi.getPlaylistById(path);
      setListSong(res.data.listSong);
      console.log(res.data.playlist);
    };
    getPlaylistByUser();
  }, [path]);

  useEffect(() => {
    const getAllSong = async () => {
      const songs = await songsApi.getAllSong();
      setSuggestsongs(songs.data);
      console.log(songs.data);
    };
    getAllSong();
  }, []);
  const handleOpenModal = () => {
    setShowModalEditPlaylist(true);
  };
  const handleFavoiteSong = (data) => {
    const songs = [...listSong];
    songs.forEach((song) => {
      if (song._id === data._id) {
        if (data.type === 'add') {
          song.isFavorite = true;
        } else {
          song.isFavorite = false;
        }
      }
    });
    setListSong(songs);
  };
  return (
    <React.Fragment>
      <div className="p-8 flex gap-8">
        <div className="gap-4">
          {state.user && state.playlist && (
            <InfoPlaylist
              playlist={state.playlist.find((x) => x._id === path)}
              onOpen={handleOpenModal}
              length={listSong.length | 0}
              user={state.user}
            />
          )}
          {showModalEditPlaylist && (
            <EditPlaylist
              playlist={state.playlist.find((x) => x._id === path)}
              // onApply={handleApplyChange}
              onClose={handleCloseModal}
              // playlist={state.playlist}
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
                        <td className="px-24 py-2">{s.artist.name}</td>
                        <td className="px-24 py-2 visible">
                          <IoIosAdd
                            className="cursor-pointer border border-gray-400 rounded-full"
                            color="black"
                            size="1.2rem"
                            title="Khác"
                            onClick={handleAdd}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/" className="mt-10 font-bold ">
                Thêm...
              </Link>
            </div>
          </div>
        ) : (
          <RenderListSong
            onFavorite={handleFavoiteSong}
            listSong={listSong}
            onSongClick={onSongClick}
            selectedSong={selectedSong}
          />
        )}
        <AddSongOnPlaylist show={show} onClose={()=>setShow(false)}/>
      </div>
    </React.Fragment>
  );
}
