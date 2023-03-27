import { set } from 'date-fns/esm';
import React, { useState } from 'react';
import { BsFillPlayCircleFill, BsHeart, BsThreeDots } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import playlistsApi from '../../axiosClient/api/playlists';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Playlist({ playlist }) {
  const PF = process.env.REACT_APP_SERVER_URL;
  const [showModal, setShowModal] = useState(false);
  const handleDeletePlaylist = async () => {
    const delPlaylist = await playlistsApi.deletePlayListById(playlist._id);
    toast.success('Xóa Playlist thành công!', {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      duration: 1000,
      onClose: () => {
        setShowModal(false)
      },
    });
    // setShowModal(false);
    console.log(delPlaylist);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <React.Fragment>
      <div className="ml-4">
        <div className="flex gap-4 flex-wrap py-4 justify-start w-full flex-col">
          <div
            style={{
              backgroundImage: `url(${
                playlist.thumbnail
                  ? `${PF}/images/${playlist.thumbnail}`
                  : 'https://picsum.photos/400'
              })`,
            }}
            className={`
            mx-auto bg-center w-[200px] group relative rounded-xl transition-all duration-500 
            hover:scale-105 h-60 bg-cover
            `}
          >
            <div className="w-full h-full group-hover:backdrop-brightness-90 rounded-xl"></div>
            <div
              className="absolute invisible group-hover:visible -bottom-52 group-hover:bottom-10 transition-all 
                duration-500 p-4 flex gap-4 left-1/2 -translate-x-1/2 justify-center"
            >
              <TiDeleteOutline
                color="white"
                className="text-[33px] hover:scale-150 cursor-pointer"
                title="Xóa"
                onClick={handleShow}
              />
              <BsFillPlayCircleFill
                color="white"
                className="text-[28px] hover:scale-150 cursor-pointer"
                title="Phát"
              />
              <Link className="" to={`/playlist/${playlist._id}`}>
                <BsThreeDots
                  color="white"
                  className="text-[28px] hover:scale-150 cursor-pointer"
                  title="Chi tiết"
                />
              </Link>
            </div>
          </div>
          <div className="mt-2 font-bold text-center">{playlist.title}</div>
        </div>
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
                  <h3 className="text-2xl font-bold">Xóa Playlist</h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <div className="flex gap-3 my-4 text-slate-500 text-lg leading-relaxed">
                    Xóa<i className="font-bold">{playlist.title}</i>khỏi Danh
                    sách phát. Bạn có muốn xóa?
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={hideModal}
                  >
                    Không
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDeletePlaylist}
                  >
                    Có
                  </button>
                  <ToastContainer className="mt-9" />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
