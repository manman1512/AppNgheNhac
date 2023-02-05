import React from 'react';
import { GiLoveSong } from 'react-icons/gi';
import { RiUserVoiceLine } from 'react-icons/ri';
import { BsFillPlayCircleFill, BsFillVolumeUpFill } from 'react-icons/bs';
import Lyrics from './lyrics';
import { AiFillStepBackward, AiFillStepNextward } from 'react-icons/ai';
import { MdSkipNext } from 'react-icons/md';
import { IoMdSkipBackward } from 'react-icons/io';

export default function Favorite() {
  return (
    <div
      className="text-white flex justify-between 
    bg-gradient-to-r from-slate-900 via-green-400 to-green-500"
    >
      <div className="flex flex-col justify-between">
        <div className="flex items-center mt-2 ml-2">
          <GiLoveSong size="12rem" />
          <p className="text-5xl font-bold">Bài hát yêu thích của bạn</p>
        </div>
        <div className="ml-11 relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-center">
            <thead className="text-lg">
              <tr>
                <th scope="col" className="px-20 py-5">
                  STT
                </th>
                <th scope="col" className="px-20 py-5">
                  Bài hát
                </th>
                <th scope="col" className="px-20 py-5">
                  Nghệ sĩ
                </th>
                <th scope="col" className="px-20 py-5">
                  Ngày thêm
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#171717]">
                <td>1</td>
                <td>Vì anh đâu có biết</td>
                <td>Madihu</td>
                <td>4/2</td>
              </tr>
              <tr className="hover:bg-[#171717]">
                <td>2</td>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>2/3</td>
              </tr>
              <tr className="hover:bg-[#171717]">
                <td>3</td>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1/2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="w-full h-20 bg-gradient-to-r from-slate-800 via-green-300 to-green-400 
        flex items-center justify-between"
        >
          <div className="flex items-center ml-3">
            <div className="mr-4">
              <img
                className="w-[50px] h-[50px]"
                src="https://picsum.photos/40"
                alt=""
              />
            </div>
            <div>
              <div>Vì anh đâu có biết</div>
              <div className="flex items-center">
                <RiUserVoiceLine />
                <div className="ml-1">Madihu</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center">
              <IoMdSkipBackward size="1.2rem" color="black" className="mr-5" />
              <BsFillPlayCircleFill color="black" size="2rem" />
              <MdSkipNext size="1.8rem" color="black" className="ml-3" />
            </div>
            <div className='flex'>
              <div className='mt-1 mr-3'>00:00</div>
              <div>
                <input
                  id="customRange1"
                  type="range"
                  className="accent-black w-full h-1 bg-transparent focus:outline-none focus:ring-0
                  focus:shadow-none bg-gray-200 rounded-lg "
                />
              </div>
              <div className='mt-1 ml-3'>00:00</div>
            </div>
          </div>
          <div className="mr-3 flex items-center">
            <div>
              <BsFillVolumeUpFill
                size="1.2rem"
                color="black"
                className="mr-1 mt-2"
              />
            </div>
            <div>
              <input
                type="range"
                className="accent-black w-20 h-1 form-range focus:outline-none focus:ring-0 focus:shadow-none
              bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
      <Lyrics />
    </div>
  );
}
