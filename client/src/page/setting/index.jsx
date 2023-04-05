import React, { useContext, useEffect, useState } from 'react';
import { BsFillCameraFill, BsFillPencilFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser, updateAvatar } from '../../store/Action';
import { Context } from '../../store/Context';
import usersApi from '../../axiosClient/api/users.js';
import axiosClient from '../../axiosClient';

export default function Setting() {
  const [state, dispatch] = useContext(Context);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(
    state.user && state.user.data && state.user ? state.user.displayName : ''
  );
 

  const PF = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if (state.user) {
      setDisplayName(state.user.displayName);
    }
  }, [state.user]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updateUser = {
      userId: state.user._id,
      displayName,
      password
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('fileName', fileName);
      data.append('file', file);
      console.log("🚀 ~ file: index.jsx:41 ~ handleSubmit ~ data:", data)
      updateUser.profilePic = fileName;
      try {
        const response = await usersApi.updateAvatar(data);
        // dispatch(updateAvatar(response.data.image))
      } catch (error) {
        console.log(error);
      }      
    }
    try {
      // console.log(123)
      const res = await axiosClient.put(
        '/users/update/',
        updateUser
        );
      console.log(res);
      // setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data.updateUser });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };
  return (
    <div>
      <div className="mt-5">
        <div className=" mx-6 mb-10">
          <div className="flex mb-3 items-center">
            <BsFillPencilFill />
            <span className="text-3xl ml-2 ">Quản lý Tài Khoản</span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col text-lg">
            <div className="flex flex-col items-center border-2 p-4 bg-[#F5F5F6]">
              <div className="flex items-center p-3 relative">
                <img
                  className="rounded-full w-28 h-28 object-cover "
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : state.user && state.user.profilePic
                      ? `${PF}/images/${state.user.profilePic}`
                      : 'https://picsum.photos/40'
                  }
                  alt=""
                />

                <ToastContainer className="mt-9" />

                <label
                  htmlFor="profileInp"
                  className="bg-slate-400 border-4 rounded-full border-green-300 absolute 
                    right-4 bottom-4 cursor-pointer"
                >
                  <BsFillCameraFill size="1rem" color="F9F9F9" />
                </label>
                <input
                  type="file"
                  name="profile"
                  id="profileInp"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div>
                <label htmlFor="displayName" className="mt-3 mr-3 ">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  id="displayName"
                  placeholder={
                    state.user ? state.user.displayName : ''
                  }
                  className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="password" className="mt-3 mr-7 ">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu mới.."
                  className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className=" cursor-pointer rounded-md p-1 mt-5 w-96 border bg-[#F5F5F6]
                border-black hover:bg-blue-300 active:bg-blue-200"
                type="submit"
              >
                Cập nhật
              </button>
              <ToastContainer className="mt-9" />
            </div>
          </form>
          {/* <div>
            <span
              className="mt-3 text-red-500 text-xs cursor-pointer font-bold
               hover:text-red-400"
              onClick={handleModal}
            >
              Xoá tài khoản
            </span>
          </div> */}
          {/* {modal && (
            <div>
              <p>Bạn có chắc muốn xóa tài khoản?</p>
              <div className="">
                <button
                  className="bg-blue-400 p-1 px-4 rounded-md border border-gray-400 
                  hover:bg-blue-300 active:bg-blue-200 mr-8"
                  onClick={handleDelete}
                >
                  Có
                </button>
                <button
                  className="bg-blue-400 p-1 px-4 rounded-md border border-gray-400 
                  hover:bg-blue-300 active:bg-blue-200"
                  onClick={handleOut}
                >
                  Không
                </button>
              </div>
            </div>
          )} */}
        </div>
        <div></div>
      </div>
    </div>
  );
}
