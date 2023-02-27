import React, { useContext } from 'react';
import { BiHeartCircle } from 'react-icons/bi';
import { RiUserVoiceLine } from 'react-icons/ri';
import {
  BsDot,
  BsFillPlayCircleFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';
// import Lyrics from './lyrics';
import { RxDot } from 'react-icons/rx';
import { MdSkipNext } from 'react-icons/md';
import { IoMdSkipBackward } from 'react-icons/io';
import {BsHeartFill} from 'react-icons/bs'
import { Context } from '../../components/store/Context';

export default function Favorite() {
  const [state, dispatch] = useContext(Context);
  return (
    <div>
      {state.user && (
        <div className="flex flex-col w-full gap-20">
          <div className="p-8 bg-[#7ac799] text-white">
            <div className="flex items-center  ">
              <BiHeartCircle size="6rem" color="" />
              <p className="text-5xl font-bold text-purple">
                Bài hát yêu thích
              </p>
            </div>
            <div className="ml-20 flex items-center">
              <img
                className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                src="https://picsum.photos/40"
                alt=""
              />
              <p className="ml-1 truncate font-bold">
                {state.user.data.User.displayName}
              </p>
              <RxDot className="mt-1" />
              <p className="text-sm">3 bài hát</p>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-left ">
              <thead className="text-lg">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bài hát
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nghệ sĩ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                Array(5)
                .fill(0)
                .map((a, i) =>(
                  <tr className="border-b hover:bg-[#aee9c5]" key={i}>
                    <th scope="row" className="px-6 py-4 ">
                      {i+1}
                    </th>
                    <td className="px-6 py-4">Vì anh đâu có biết</td>
                    <td className="px-6 py-4">Madihu</td>
                    <td className="px-6 py-4">Today</td>
                    <td className="px-6 py-4"><BsHeartFill className='cursor-pointer' title='Xóa khỏi mục yêu thích'/></td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>

          <div
            className=" h-20 flex items-center justify-between border
          bg-[#1c1c1c]"
          >
            <div className="flex items-center ml-2">
              <div className="mr-4 ">
                <img
                  className="w-[50px] h-[50px] rounded-xl"
                  src="https://picsum.photos/40"
                  alt=""
                />
              </div>
              <div className="text-white">
                <div className="font-bold">Vì anh đâu có biết</div>
                <div className="flex items-center">
                  <RiUserVoiceLine />
                  <div className="ml-1">Madihu</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center">
                <IoMdSkipBackward
                  size="1.2rem"
                  color="white"
                  className="mr-5"
                />
                <BsFillPlayCircleFill color="white" size="2rem" />
                <MdSkipNext size="1.8rem" color="white" className="ml-3" />
              </div>
              <div className="flex text-white">
                <div className="mt-1 mr-3">00:00</div>
                <div>
                  <input
                    id="customRange1"
                    type="range"
                    className="accent-white w-full h-1 bg-transparent focus:outline-none focus:ring-0
                  focus:shadow-none bg-gray-200 rounded-lg "
                  />
                </div>
                <div className="mt-1 ml-3">00:00</div>
              </div>
            </div>
            <div className="mr-3 flex items-center ">
              <div>
                <BsFillVolumeUpFill
                  size="1.2rem"
                  color="white"
                  className="mr-1 mt-2"
                />
              </div>
              <div>
                <input
                  type="range"
                  className="accent-white w-20 h-1 form-range focus:outline-none focus:ring-0 focus:shadow-none
              bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
