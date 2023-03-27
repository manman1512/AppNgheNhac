import React from 'react';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

export default function EditPlaylist({playlist, onClose, onApply}) {
  const [image, setImage] = useState(null);

  return (
    <React.Fragment>
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
                <h3 className="text-2xl font-bold">Chỉnh sửa</h3>
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
                      {image ? (
                        <div
                          className="w-40 h-40 bg-contain bg-no-repeat"
                          style={{
                            backgroundImage: `url(${URL.createObjectURL(image)})`,
                          }}
                        ></div>
                      ) : (
                        <React.Fragment>
                          <FiEdit2 className="" />
                          <p>Chọn ảnh</p>
                        </React.Fragment>
                      )}
                    </label>
                    <input
                      // onChange={(e) => {
                      //   setImage(e.target.files[0]);
                      // }}
                      // value={playlist.thumbnail}
                      type="file"
                      id="inputImg"
                      className="absolute opacity-0 -z-[1]"
                    />
                  </div>
                  <div className="flex gap-3 flex-col justify-around items-center">
                    <textarea
                      value={playlist.title}
                      // onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      rows="2"
                      className="block p-2.5 w-full text-sm resize-none outline-none
                            border border-black rounded-xl"
                      placeholder="Nhập tiêu đề..."
                    ></textarea>
                    <textarea
                      value={playlist.description}
                      // onChange={(e) => setDescription(e.target.value)}
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
                  onClick={onClose}
                >
                  Đóng
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>onApply()}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>

  );
}
