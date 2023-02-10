import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHome, AiFillSetting } from 'react-icons/ai';
import { RiPlayListFill } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import Logoo from '../../images/Logooo.png';
export default function Navigation({ className }) {
  const iconSize = '1.5rem';
  const bgColor = '#27AE60';
  const iconColor = 'white';

  const location = useLocation();
  const [select, setSelect] = useState('home');
  // const [menu, setMenu] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelect('home');
        break;
      case '/favorite':
        setSelect('favorite');
        break;
      case '/playlist':
        setSelect('playlist');
        break;
      case '/setting':
        setSelect('setting');
        break;
      default:
        setSelect('home');
    }
  }, [location]);
  useEffect(() => {
    const listElement = document.querySelectorAll('.navigate');
    listElement.forEach((element) => {
      if (element.getAttribute('user-label') === select) {
        element.style.backgroundColor = bgColor;
        element.childNodes[0].style.color = '#fff';
      } else {
        element.style.backgroundColor = 'transparent';
        element.childNodes[0].style.color = iconColor;
      }
    });
  }, [select]);
  useEffect(() => {
    const listElement = document.querySelectorAll('.navigate');
    listElement.forEach((el) => {
      el.childNodes[0].style.color = iconColor;
    });
  }, []);
  function _onMouseOver(event) {
    event.stopPropagation();
    const element = event.currentTarget;
    // const label = element.getAttribute('user-label');
    element.style.backgroundColor = bgColor;
    element.style.color = '#fff';
    element.childNodes[0].style.color = '#fff';
  }
  function _onMouseOut(event) {
    event.stopPropagation();
    const element = event.currentTarget;
    element.style.backgroundColor = 'transparent';
    element.childNodes[0].style.color = iconColor;
    const listElement = document.querySelectorAll('.navigate');
    listElement.forEach((element) => {
      if (element.getAttribute('user-label') === select) {
        element.style.backgroundColor = bgColor;
        element.childNodes[0].style.color = '#fff';
      }
    });
  }

  // const hideMenu = (e) => {
  //   setMenu(true)
  // };

  return (
    <div className={`${className} `}>
      <div className="flex flex-col gap-2 justify-center items-center ">
        <div className="flex font-semibold items-center  ">
          <img className="w-[80px] h-[80px]" src={Logoo} alt="" />
          <p className=" text-white ">MEO</p>
        </div>

        <div className="items-center justify-around flex flex-col py-3 w-full gap-2">
          <div
            user-label="home"
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px] w-full flex justify-between `}
          >
            <Link to="/" className="flex">
              <AiFillHome size={iconSize} />
              <p className="ml-2">Trang Chủ</p>
            </Link>
          </div>
          <div
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px] w-full flex justify-between `}
          >
            <Link className="flex">
              <BiSearch size={iconSize} />
              <p className="ml-2">Tìm Kiếm</p>
            </Link>
          </div>
          {
            // {<div
            //   onMouseOver={_onMouseOver}
            //   onMouseOut={_onMouseOut}
            //   className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
            // >
            //   <Link className="flex">
            //     <BiHeadphone size={iconSize} />
            //     <p className="ml-2">Đang Phát</p>
            //   </Link>
            // </div>
          }
          <div
            user-label="playlist"
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
          >
            <Link to="/playlist" className="flex">
              <RiPlayListFill size={iconSize} />
              <p className="ml-2">Playlist</p>
            </Link>
          </div>
          <div
            user-label="favorite"
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
          >
            <Link to="/favorite" className="flex">
              <AiOutlineHeart size={iconSize} />
              <p className="ml-2">Yêu Thích</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col relative">
        <div className="mb-5 w-full flex justify-between">
          <Link className="flex">
            <AiFillSetting size={iconSize} color={iconColor} />
            <p className="ml-2 text-white">Cài Đặt</p>
          </Link>
          {
            // menu && <div className="bg-blue-50 absolute ml-24">Menu</div>
          }
        </div>
        <div className="mb-5 w-full flex justify-between">
          <Link className="flex">
            <CiLogout size={iconSize} color={iconColor} />
            <p className="ml-2 text-white">Đăng Xuất</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
