import React from 'react';
import Navigation from '../bar/Navigation';
import Topbar from '../bar/Topbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="h-screen">
      <Topbar />
      <div className="flex h-[calc(100%-4rem)]">
        <Navigation
          className="w-[10rem] py-3 box-border flex flex-col items-center 
      justify-between left-0 z-[1] h-full border-r border-[#e5e5e5]"
        />
        <div className="w-[calc(100%-10rem)] overflow-y-auto relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
