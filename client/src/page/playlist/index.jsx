import React, { useContext, useState } from 'react';
import { BsFillPlayCircleFill, BsFillBackspaceFill } from 'react-icons/bs';
import { IoMdAddCircle } from 'react-icons/io';
import { FaTimesCircle } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { Context } from '../../components/store/Context';
import { FiEdit2 } from 'react-icons/fi';
import { BiDotsVerticalRounded } from 'react-icons/bi';

export default function Playlist() {
  const [state, dispatch] = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = (e) => {
    console.log(e);
  };

  return (
    <React.Fragment>
      <div className="flex items-center w-full z-[1000] p-4">
        <p className="text-2xl font-bold mr-2">Playlist của bạn</p>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          title="Thêm playlist"
        >
          <IoMdAddCircle size="2rem" />
        </button>
      </div>

      {showModal ? (
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
          inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full 
              bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <div
                  className="flex justify-center p-5 border-b border-solid 
                border-slate-200 rounded-t"
                >
                  <h3 className="text-2xl font-bold">Thêm danh sách phát</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex gap-3 my-4 text-slate-500 text-lg leading-relaxed">
                    <div
                      className="flex flex-col justify-center items-center border border-black
                    w-40 h-44 rounded-xl group
                    "
                    >
                      <label
                        htmlFor="inputImg"
                        className="flex flex-col items-center justify-center 
                      mb-2 cursor-pointer text-sm"
                      >
                        <FiEdit2 className="" />
                        Chọn ảnh
                      </label>
                      <input
                        type="file"
                        id="inputImg"
                        className="absolute opacity-0 -z-[1]"
                      />
                      {
                        // <div
                        //   className="flex items-center justify-center group absolute bg-transparent
                        // h-[50%] w-12 top-1/4 -translate-y-1/2 right-[200px] z-50"
                        // >
                        //   <button
                        //     // onClick={c}
                        //     className="invisible group-hover:visible bg-[#d9d5d5] p-1 rounded-full"
                        //   >
                        //     <BiDotsVerticalRounded />
                        //   </button>
                        // </div>
                      }
                    </div>

                    <div className="flex gap-3 flex-col justify-around items-center">
                      <textarea
                        id="title"
                        rows="2"
                        className="block p-2.5 w-full text-sm resize-none outline-none 
                        border border-black rounded-xl"
                        placeholder="Nhập tiêu đề..."
                      ></textarea>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm resize-none outline-none
                        border border-black rounded-xl"
                        placeholder="Thêm phần mô tả (không bắt buộc)"
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

      {state.user ? (
        <div className="flex gap-4 flex-wrap py-4 justify-start w-full">
          {Array(20)
            .fill(0)
            .map((s, i) => (
              <div
                key={i}
                data-id={i}
                className="w-[calc(20%-1rem)]"
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleOnClick(s);
                }}
              >
                <div
                  key={i}
                  className="
                    mx-auto 
                    bg-[url(https://bloganchoi.com/wp-content/uploads/2021/01/am-nhac-hay.jpg)] 
                    w-[200px] group relative rounded-xl transition-all duration-500 hover:scale-105 h-60 bg-cover"
                >
                  <div className="w-full h-full group-hover:backdrop-brightness-90 rounded-xl"></div>
                  <div
                    className="absolute invisible group-hover:visible -bottom-52 group-hover:bottom-10 transition-all 
                    duration-500 p-4 flex gap-4 left-1/2 -translate-x-1/2 justify-center"
                  >
                    <FaTimesCircle
                      color="white"
                      className="text-[28px] hover:scale-150 cursor-pointer"
                      title="Xóa"
                    />
                    <BsFillPlayCircleFill
                      color="white"
                      className="text-[28px] hover:scale-150 cursor-pointer"
                      title="Phát"
                    />
                    <BsThreeDots
                      color="white"
                      className="text-[28px] hover:scale-150 cursor-pointer"
                      title="Chỉnh sửa"
                    />
                  </div>
                </div>
                <p className="mt-2 font-bold text-center">Đây là playlist</p>
              </div>
            ))}
        </div>
      ) : (
        <div>you are not logged in</div>
      )}
    </React.Fragment>
  );
}
