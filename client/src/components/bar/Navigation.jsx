import React, { useContext, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHome, AiFillSetting } from 'react-icons/ai';
import { RiPlayListFill } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logoo from '../../images/Logooo.png';
import { Context } from '../../store/Context.js';
export default function Navigation({ className }) {
  const iconSize = '1.5rem';
  const bgColor = '#27AE60';
  const iconColor = 'black';

  const location = useLocation();
  const [select, setSelect] = useState('home');
  const [state, dispatch] = useContext(Context);

  // console.log(state.user)
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

  return (
    <div className={`${className} `}>
      <div className="flex flex-col gap-2 justify-center items-center w-[11rem]">
        <div className="items-center justify-around flex flex-col  w-full gap-2">
          <div
            user-label="home"
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px] w-full flex justify-between `}
          >
            <Link to="/" className="flex">
              <AiFillHome size={iconSize} />
              <p className="ml-2 font-bold">Trang Chủ</p>
            </Link>
          </div>
          {state.user ? (
            <div
              user-label="playlist"
              onMouseOver={_onMouseOver}
              onMouseOut={_onMouseOut}
              className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
            >
              <Link to="/playlist" className="flex">
                <RiPlayListFill size={iconSize} />
                <p className="ml-2 font-bold">Tạo Playlist</p>
              </Link>
            </div>
          ) : (
            <div
              user-label="playlist"
              onMouseOver={_onMouseOver}
              onMouseOut={_onMouseOut}
              className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
            >
              <Link to="/login" className="flex">
                <RiPlayListFill size={iconSize} />
                <p className="ml-2 font-bold">Playlist</p>
              </Link>
            </div>
          )}

          {state.user ? (
            <div
              user-label="favorite"
              onMouseOver={_onMouseOver}
              onMouseOut={_onMouseOut}
              className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
            >
              <Link to="/favorite" className="flex">
                <AiOutlineHeart size={iconSize} />
                <p className="ml-2 font-bold">Yêu Thích</p>
              </Link>
            </div>
          ) : (
            <div
              user-label="favorite"
              onMouseOver={_onMouseOver}
              onMouseOut={_onMouseOut}
              className={`navigate p-2 rounded-[14px] w-full flex justify-between`}
            >
              <Link to="/login" className="flex">
                <AiOutlineHeart size={iconSize} />
                <p className="ml-2 font-bold">Yêu Thích</p>
              </Link>
            </div>
          )}
        </div>
      </div>
      {
        // {state.user && (
        //   <div className="flex items-center flex-col relative">
        //     <div className="mb-5 w-full flex justify-between">
        //       <Link className="flex">
        //         <AiFillSetting size={iconSize} color={iconColor} />
        //         <p className="ml-2 font-bold">Cài Đặt</p>
        //       </Link>
        //       {
        //         // menu && <div className="bg-blue-50 absolute ml-2 font-bold4">Menu</div>
        //       }
        //     </div>
        //   </div>
        // )}
      }
    </div>
  );
}
