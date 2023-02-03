import React, { useEffect, useState } from 'react';
import { BiHeadphone, BiSearch } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHome, AiFillSetting } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ className }) {
  const iconSize = '1.5rem';
  const bgColor = '#27AE60';
  const iconColor = '#27AE60';

  const location = useLocation();
  const [select, setSelect] = useState('home');
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelect('home');
        break;
      case '/favorite':
        setSelect('favorite');
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
  useEffect(()=>{
    const listElement = document.querySelectorAll('.navigate');
    listElement.forEach(el=>{
      el.childNodes[0].style.color = iconColor;
    })
  },[])
  function _onMouseOver(event) {
    event.stopPropagation();
    const element = event.currentTarget;
    const label = element.getAttribute('user-label');
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
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          className="rounded-full w-[40px] h-[40px]"
          src="https://picsum.photos/40"
          alt=""
        />
        <div className="items-center justify-around border-t-2 flex flex-col py-2 w-full gap-2">
          <div
            user-label="home"
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px] `}
          >
            <Link to="/" className={``}>
              <AiFillHome size={iconSize} />
            </Link>
          </div>
          <div
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px]`}
          >
            <Link className={``}>
              <BiSearch size={iconSize} />
            </Link>
          </div>
          <div
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px]`}
          >
            <Link className={``}>
              <BiHeadphone size={iconSize} />
            </Link>
          </div>
          <div
            user-label="favorite"
            onMouseOver={_onMouseOver}
            onMouseOut={_onMouseOut}
            className={`navigate p-2 rounded-[14px]`}
          >
            <Link to="/favorite" className={``}>
              <AiOutlineHeart size={iconSize} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <div className="mb-5">
          <Link>
            <AiFillSetting size={iconSize} color={iconColor} />
          </Link>
        </div>
        <div className="mb-5">
          <Link>
            <CiLogout size={iconSize} color={iconColor} />
          </Link>
        </div>
      </div>
    </div>
  );
}
