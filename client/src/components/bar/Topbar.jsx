import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="bg-[#171717] h-12 text-white flex justify-end items-center">
      <div className="mr-5">
        <Link to="/login">Login</Link>
      </div>
      
    </div>
  );
}
