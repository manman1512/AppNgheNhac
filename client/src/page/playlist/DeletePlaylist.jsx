import React, { useContext } from 'react';
import DetailPlaylist from './detailPlaylist';
import { Context } from '../../store/Context';
import playlistsApi from '../../axiosClient/api/playlists';
import { setPlaylist, updatePlaylistSuccess } from '../../store/Action';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function DeletePlaylist({ playlist, onClose }) {
  const navigate = useNavigate();
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
  // const hideModal = () => {
  //   setShowModal(false);
  // };
  const handleDeletePlaylist = async () => {
    try {
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
          onClose()
          navigate('/playlist', { replace: true });
        },
      });
      const datas = await playlistsApi.getPlaylistByUser();
      dispatch(setPlaylist(datas.data.playlists));
      dispatch(updatePlaylistSuccess(datas.data.playlists));
      console.log(delPlaylist);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <React.Fragment>
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
                    onClick={onClose}
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
                  {/* <ToastContainer className="mt-9" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    </React.Fragment>
  );
}
