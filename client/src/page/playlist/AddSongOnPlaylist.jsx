import React, { useContext } from 'react';
import DetailPlaylist from './detailPlaylist';
import { ToastContainer } from 'react-toastify';
import { Context } from '../../store/Context';

export default function AddSongOnPlaylist({ show, onClose }) {
  const [state, dispatch] = useContext(Context)
  const handleOverlayClick = (event) => {
    // Đóng modal khi click vào phần overlay bao quanh
    if (
      event.target.classList.contains('inset-0') &&
      event.target.classList.contains('z-50')
    ) {
      onClose();
    }
  };
  
  return (
    <React.Fragment>
      <div>
        {show && (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
          inset-0 z-50 outline-none focus:outline-none"
              onClick={handleOverlayClick}
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
                    {
                      //   <img
                      //   className="w-[50px] h-[50px] rounded-xl"
                      //   src={selectedSong.thumbnail}
                      //   alt=""
                      // />
                    }
                  </div>
                  {/*body*/}
                  <div className="relative p-4 flex-auto">
                    <div className="flex gap-3 my-4 text-slate-500 text-lg leading-relaxed">
                      Xóa<i className="font-bold">hiihi</i>khỏi Danh sách phát.
                      Bạn có muốn xóa?
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" inset-0 z-40 bg-black"></div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
