import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="bg-[#171717] h-12 text-white flex justify-end items-center
    w-auto sticky font-bold top-0 
      font-sanspx-2 z-[99999]">
      <div className="mr-5 font-bold hover:bg-white text-black p-1 rounded-md bg-[#DDDDDD]">
        <Link to="/login">Đăng nhập</Link>
      </div>
      
    </div>
  );
}
