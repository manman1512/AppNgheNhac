import React, { useContext, useEffect, useId, useState } from 'react';
import { BsFillPlayCircleFill, BsFillBackspaceFill } from 'react-icons/bs';
import { IoMdAddCircle, IoMdImages } from 'react-icons/io';
import { FaTimesCircle } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { Context } from '../../store/Context';
import { FiEdit2 } from 'react-icons/fi';
import playlistsApi from '../../axiosClient/api/playlists.js';
import { useLocation } from 'react-router-dom';
import Playlist from './playlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Playlists() {
  const [state, dispatch] = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const _id = useId();
  // const location = useLocation();
  // console.log(location)

  const handleOnClick = (e) => {
    console.log(e);
  };
  const modal = () => {
    setShowModal(false);
    setImage(null)
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('fileName', image.name.split('.')[0] + Date.now());
    formData.append('file', image);
    console.log('🚀 ~ file: index.jsx:29 ~ handleSubmit ~ formData:', formData);

    try {
      const res = await playlistsApi.createPlayList(formData);
      console.log('🚀 ~ file: index.jsx:36 ~ handleSubmit ~ res:', res);
      toast.success('Tạo Playlist thành công!', {
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
      const datas = await playlistsApi.getPlaylistByUser();
      setPlaylists(datas.data.playLists);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(image);
  }, [image]);

  useEffect(() => {
    const getPlaylistByUser = async () => {
      const res = await playlistsApi.getPlaylistByUser();
      setPlaylists(res.data.playLists);
      console.log('🚀 ~ file: index.jsx:21 ~ getPlaylistByUser ~ res:', res);
      // console.log(state.user.data.User.playList.length)
    };
    getPlaylistByUser();
  }, []);

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
                        {image ? (
                          <div
                            className="w-40 h-44 bg-contain bg-no-repeat rounded-xl"
                            style={{
                              backgroundImage: `url(${URL.createObjectURL(
                                image
                              )})`,
                              backgroundSize: '100% 100%'
                            }}
                          ></div>
                        ) : (
                          <React.Fragment>
                            <IoMdImages size="3rem" color='black' />
                            <p className='text-black'>Chọn ảnh</p>
                          </React.Fragment>
                        )}
                      </label>
                      <input
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                        type="file"
                        id="inputImg"
                        className="absolute opacity-0 -z-[1]"
                      />
                    </div>

                    <div className="flex gap-3 flex-col justify-around items-center">
                      <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        rows="2"
                        className="block p-2.5 w-full text-sm resize-none outline-none 
                        border border-black rounded-xl"
                        placeholder="Nhập tiêu đề..."
                      ></textarea>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    onClick={modal}
                  >
                    Đóng
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      modal();
                      handleSubmit();
                    }}
                  >
                    Thêm
                  </button>
                  <ToastContainer className="mt-9" />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

      {state.user && state.user.playList.length === 0 ? (
        <div className="flex flex-col items-center absolute top-1/2 left-[40%] -mt-12 -ml-12">
          <div className="text-3xl font-bold text-purple mb-4">
            Bạn chưa có Playlist nào
          </div>
          <div className="font-bold text-purple mb-4">
            Hãy tạo để thưởng thức
          </div>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap py-4 justify-start w-full">
          {playlists.map((playlist, index) => (
            <Playlist
              key={index}
              data-id={index}
              playlist={playlist}
              className="w-[calc(20%-1rem)]"
              // onContextMenu={(e) => {
              //   e.preventDefault();
              //   handleOnClick(playlist);
              // }}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
