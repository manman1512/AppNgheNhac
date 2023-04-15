import React, { useContext, useEffect } from 'react';
import Navigation from '../bar/Navigation';
import Topbar from '../bar/Topbar';
import { Outlet } from 'react-router-dom';
import Player from '../Player';
import { Context } from '../../store/Context';
import usersApi from '../../axiosClient/api/users';
import { setLoveSong, setPlaylist, setUser } from '../../store/Action';
import playlistsApi from '../../axiosClient/api/playlists';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loveSongApi from '../../axiosClient/api/loveSong';

export default function Layout() {
  // const [state, dispatch] = useContext(Context);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token !== null) {
      (async () => {
        const response = await usersApi.getMe();
        const loveSongs = await loveSongApi.getLoveSongByUser();
        const res = await playlistsApi.getPlaylistByUser();
        const playlists = res.data.playlists
        const lovesongs = loveSongs.data.lovesong;
        dispatch(setLoveSong(lovesongs));
        dispatch(setPlaylist(playlists))
        dispatch(setUser(response.data.User));
      })();
    }
    // console.log(state)
  }, []);
  // console.log(state);
  // useEffect(() => {
  //   const getPlaylistByUser = async () => {
  //     const res = await playlistsApi.getPlaylistByUser();
  //     console.log(res);

  //   };
  //   getPlaylistByUser();
  // }, []);

  return (
    <div className="h-screen relative">
      <Topbar />
      <div className="flex h-[calc(100%-4rem)]">
        <Navigation
          playlist={state.playlist}
          className="w-[12rem] py-3 box-border flex flex-col items-center 
      justify-between left-0 z-[1] h-full border-r border-[#e5e5e5] shadow-xl"
        />
        <div className="w-[calc(100%-10rem)] overflow-y-auto">
          <Outlet />
          {
            // state.player.selectedSong && <Player/>
            state.player.show && <Player />
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
