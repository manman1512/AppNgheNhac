import React from 'react'
import Navigation from '../bar/Navigation'
import Topbar from '../bar/Topbar'
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
    <Navigation className="w-[10rem] bg-[#171717] py-3 box-border flex flex-col items-center justify-between" />
    <div className="w-full h-full">
      <Topbar />
      <div className="w-full bg-[#282828] h-[calc(100%-3rem)]">
        <Outlet/>
      </div>
    </div>
  </div>
  )
}
