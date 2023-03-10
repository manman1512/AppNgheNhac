import React, { useContext, useEffect } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import {MdOutlineArrowDropDown} from 'react-icons/md'
import { Link } from 'react-router-dom';
import usersApi from '../../axiosClient/api/users.js';
import { setUser } from '../store/Action.js';
import { Context } from '../store/Context.js';
import Logoo from '../../images/LogoHeader.png';
import { HiOutlineSearch } from 'react-icons/hi';

export default function Topbar() {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    // console.log(token);
    if (token !== null) {
      (async () => {
        const user = await usersApi.getMe();
        dispatch(setUser(user));
      })();
    }
    console.log(state.user);
  }, []);

  const handleLogout = (e) => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <div
      className=" h-16  flex items-center
      w-auto sticky top-0 font-sanspx-2 z-[99999] border-b border-[#e5e5e5]"
    >
      <Link to="/" className=" font-semibold items-center flex">
        <img className="w-[55px] h-[55px] items-center" src={Logoo} alt="" />
        <p className="  text-2xl ">SongSphere</p>
      </Link>

      <div className="relative w-96 mx-auto">
        <input
          type="search"
          className="block p-2 w-full z-20 rounded-3xl
            border-gray-500 border outline-none "
          placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5
             bg-[#f4f3f3] rounded-r-3xl border border-gray-500
             focus:outline-none  dark:bg-[#f4f3f3]
             "
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <HiOutlineSearch size="1.5rem" className="" />
          </svg>
        </button>
      </div>

      {state.user ? (
        <div className="cursor-pointer mr-5">
          <div
            className="flex items-center justify-center flex-initial group bg-[#51cf85] p-1
            rounded-full"
          >
            <img
              className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
              src="https://picsum.photos/40"
              alt=""
            />
            <p className="ml-1 mr-1 truncate font-bold text-white">
              {state.user.data.User.displayName}
            </p>
            <MdOutlineArrowDropDown color='white' size="1.5rem"/>
            <div className=" absolute invisible group-hover:visible w-40 ">
              <div
                className="bg-[white] mt-36 p-2 relative mr-5 rounded-lg "
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                }}
              >
                <div className="hover:bg-[#27AE60] hover:rounded-lg hover:text-white p-1 ">
                  <Link to="/setting" className="flex items-center">
                    <BiUserCircle size="1.2rem" className="" />
                    <p className="pl-2 ">Tài khoản</p>
                  </Link>
                </div>
                <div className="hover:bg-[#27AE60] hover:rounded-lg hover:text-white p-1 mt-2">
                  <Link className="flex  items-center" onClick={handleLogout}>
                    <CiLogout size="1.2rem" />
                    <p className="ml-2 ">Đăng Xuất</p>
                  </Link>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" mr-2 font-bold p-2 
         outline-none  bg-[#1E293B] text-white 
                  hover:bg-slate-600 rounded-lg"
        >
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}
    </div>
  );
}
