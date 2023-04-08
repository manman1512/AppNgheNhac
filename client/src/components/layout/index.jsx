import React, { useContext, useEffect } from 'react';
import Navigation from '../bar/Navigation';
import Topbar from '../bar/Topbar';
import { Outlet } from 'react-router-dom';
import Player from '../Player';
import { Context } from '../../store/Context';
import usersApi from '../../axiosClient/api/users';
import { setPlaylist, setUser } from '../../store/Action';
import playlistsApi from '../../axiosClient/api/playlists';

export default function Layout() {
  // const [state, dispatch] = useContext(Context);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    console.log(token);
    if (token !== null) {
      (async () => {
        const response = await usersApi.getMe();
        // console.log(response.data.User);
        dispatch(setUser(response.data.User));
      })();
    }
    // console.log(state)
  }, []);
  // console.log(state);
  useEffect(() => {
    const getPlaylistByUser = async () => {
      const res = await playlistsApi.getPlaylistByUser();
      const playlists = res.data.playLists
      // setPlaylists(playlists);
      dispatch(setPlaylist(playlists))
      console.log('🚀 ~ file: index.jsx:21 ~ getPlaylistByUser ~ res:', res);
      // console.log(state.playlist)
    };
    getPlaylistByUser();
  }, []);
  
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
            state?.player?.selectedSong && <Player />
          }
        </div>
      </div>
    </div>
  );
}
