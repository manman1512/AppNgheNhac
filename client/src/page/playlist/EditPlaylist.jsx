import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdAddCircle, IoMdImages } from 'react-icons/io';
import { Context } from '../../store/Context';
import playlistsApi from '../../axiosClient/api/playlists';
import Playlist from './playlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { updatePlaylistSuccess } from '../../store/Action';

// export default function EditPlaylist({ playlist, onClose, onApply }) {
export default function EditPlaylist({ playlist, onClose }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkThumbnail, setLinkThumbnail] = useState("");
  useEffect(()=>{
    if(image){
      const url = URL.createObjectURL(image);
      setLinkThumbnail(url)
    }
    return ()=> URL.revokeObjectURL(linkThumbnail);
  },[image])
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  useEffect(()=>{
    setTitle(playlist.title)
    setDescription(playlist.description)
  },[playlist.title, playlist.description])

  const handleApplyChange = async (e) => {
    dispatch({ type: 'UPDATE_PLAYLIST' });
    const updatePlaylist = {
      title,
      description,
      thumbnail: image
    };
    const newForm = new FormData();
    newForm.append("id", playlist._id)
    newForm.append("title", title)
    newForm.append("description", description)
    newForm.append("fileName", Date.now()+Math.floor(Math.random() * (999 - 100 + 1) + 100)+"." + image.name.split(".").pop())
    newForm.append("file", image);
    try {
      const res = await playlistsApi.updatePlayListById(newForm);
      console.log(res);

      toast.success('Cập nhật Playlist thành công!', {
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
          onClose();
          // navigate('/playlist/{playlist._id}', { replace: true });
        },
      });
      console.log(res);
      dispatch(updatePlaylistSuccess(res.data));
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed
                    inset-0 z-[1000] outline-none focus:outline-none"
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
                    {linkThumbnail ? (
                      <div
                        className="w-40 h-44 bg-contain bg-no-repeat rounded-xl"
                        style={{
                          backgroundImage: `url(${linkThumbnail})`,
                          backgroundSize: '100% 100%',
                        }}
                      ></div>
                    ) : (
                      <React.Fragment>
                        <IoMdImages size="3rem" color="black" />
                        <p className="text-black">Chọn ảnh</p>
                      </React.Fragment>
                    )}
                  </label>
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    // value={playlist.thumbnail}
                    type="file"
                    id="inputImg"
                    className="absolute opacity-0 -z-[1]"
                  />
                </div>
                <div className="flex gap-3 flex-col justify-around items-center">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    name="title"
                    className="block p-2.5 w-full text-sm resize-none outline-none
                            border border-black rounded-xl"
                    placeholder={playlist.title}
                    />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm resize-none outline-none
                            border border-black rounded-xl"
                    placeholder={playlist.description}
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
                onClick={() => {
                  handleApplyChange();
                }}
              >
                Cập nhật
              </button>
              {/* <ToastContainer className="mt-9" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
}
