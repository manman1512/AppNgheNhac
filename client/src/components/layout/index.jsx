import React, { useContext } from 'react';
import Navigation from '../bar/Navigation';
import Topbar from '../bar/Topbar';
import { Outlet } from 'react-router-dom';
import Player from '../Player';
import { Context } from '../../store/Context';

export default function Layout() {
  const [state, dispatch] = useContext(Context);
  console.log(state);
  return (
    <div className="h-screen relative">
      <Topbar />
      <div className="flex h-[calc(100%-4rem)]">
        <Navigation
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
