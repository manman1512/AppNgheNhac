import React, { useContext, useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import usersApi from '../../axiosClient/api/users.js';
import { setUser } from '../../store/Action.js';
import { Context } from '../../store/Context.js';
import Logoo from '../../images/LogoHeader.png';
import { HiOutlineSearch } from 'react-icons/hi';
import axiosClient from '../../axiosClient/index.js';
import { BsFillCameraFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Topbar() {
  const [state, dispatch] = useContext(Context);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordOld, setPasswordOld] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
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
      password,
      passwordOld
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
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
        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          duration: 1000,
          // onClose: () => {
          // },
        });
      console.log(res);
      // setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data.updateUser });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };
  
  const modal = () => setShowModal(false);

  const handleLogout = (e) => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div
      className=" h-16  flex items-center
      w-auto sticky top-0 font-sanspx-2 z-[99999] border-b border-[#e5e5e5]"
    >
      <Link to="/" className=" font-semibold items-center flex">
        <img className="w-[55px] h-[55px] items-center" src={Logoo} alt="" />
        <p className="  text-2xl ">SongSphere</p>
      </Link>

      <div className="relative w-96 mx-auto">
        <input
          type="search"
          className="block p-2 w-full z-20 rounded-3xl
            border-gray-500 border outline-none "
          placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5
             bg-[#f4f3f3] rounded-r-3xl border border-gray-500
             focus:outline-none  dark:bg-[#f4f3f3]
             "
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <HiOutlineSearch size="1.5rem" className="" />
          </svg>
        </button>
      </div>

      {state.user ? (
        <div className="cursor-pointer mr-5">
          <div
            className="flex items-center justify-center flex-initial group bg-[#51cf85] p-1
            rounded-full"
          >
            <img
              className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
              src={
                state.user.profilePic
                  ? `${PF}/images/${state.user.profilePic}`
                  : 'https://picsum.photos/40'
              }
              alt=""
            />
            <p className="ml-1 mr-1 truncate font-bold text-white">
              {state.user.displayName}
            </p>
            <MdOutlineArrowDropDown color="white" size="1.5rem" />
            <div className=" absolute invisible group-hover:visible w-40 ">
              <div
                className="bg-[white] mt-36 p-2 relative mr-5 rounded-lg "
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                }}
              >
                <div
                  className="hover:bg-[#27AE60] hover:rounded-lg hover:text-white p-1 "
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <div className="flex items-center">
                    <BiUserCircle size="1.2rem" className="" />
                    <p className="pl-2 ">Tài khoản</p>
                  </div>
                </div>
                <div className="hover:bg-[#27AE60] hover:rounded-lg hover:text-white p-1 mt-2">
                  <Link className="flex  items-center" onClick={handleLogout}>
                    <CiLogout size="1.2rem" />
                    <p className="ml-2 ">Đăng Xuất</p>
                  </Link>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" mr-2 font-bold p-2 outline-none  bg-[#1E293B] text-white 
          hover:bg-slate-600 rounded-lg"
        >
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}

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
                  <h3 className="text-2xl font-bold">Quản lý Tài Khoản</h3>
                </div>
                {/*body*/}
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
                        placeholder={state.user ? state.user.displayName : ''}
                        className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>

                    <div className="mt-3">
                      <label htmlFor="passwordOld" className="mt-3 mr-7 ">
                        Mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        name="passwordOld"
                        id="passwordOld"
                        // placeholder="Nhập mật khẩu cũ"
                        className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        onChange={(e) => setPasswordOld(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="password" className="mt-3 mr-7 ">
                        Mật khẩu Mới
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        // placeholder="Nhập mật khẩu mới.."
                        className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="passwordConf" className="mt-3 mr-7 ">
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="passwordConf"
                        id="passwordConf"
                        // placeholder="Nhập mật khẩu mới.."
                        className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        onChange={(e) => setPasswordConf(e.target.value)}
                      />
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
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold 
                    uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                    focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
            
                  >
                    Cập nhật
                  </button>
                  <ToastContainer className="mt-9" />
                </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}
