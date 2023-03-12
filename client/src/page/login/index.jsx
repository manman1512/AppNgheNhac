import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
// import { Input } from '../register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import LogoHeader from '../../images/LogoHeader.png';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { Context } from '../../components/store/Context';

export default function Login() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  // const [state, dispatch] = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    try {
      const res = await axiosClient.post('/auth/login', {
        username,
        password,
      });
      console.log(res);
      const token = res.data.accessToken;
      localStorage.setItem('accessToken', token);

      if(username === 'Admin'){
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
        onClose: () => {
          navigate('/admin', { replace: true });
        },
      });
      } else{
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
          onClose: () => {
            navigate('/', { replace: true });
          },
        });
      }
    } catch (error) {
      setSuccess(true);
      console.error(error);
    }
  };
  return (
    <div>
      <div
        className="container-register p-5 w-full min-h-screen flex flex-wrap 
        justify-center items-center"
      >
        <div className="bg-white pr-14 pl-14 pb-14 pt-10">
          <FormProvider>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex justify-center items-center">
                <img className="w-[80px] h-[80px]" src={LogoHeader} alt="" />
                <div className="font-bold text-3xl">SongSphere</div>
              </div>
              <div>
                <div
                  className="flex items-center justify-center bg-[#405A93] text-white rounded-2xl
              p-2"
                >
                  <FaFacebookSquare />
                  <p className="ml-1 font-bold">Đăng nhập bằng Facebook</p>
                </div>
                <div
                  className="flex items-center justify-center rounded-2xl border-spacing-2 
              border-2 border-gray-500 p-2 mt-2"
                >
                  <AiFillGoogleCircle color="red" />
                  <p className="ml-1 font-bold">Đăng nhập bằng Google</p>
                </div>
              </div>

              <div className="flex justify-center mt-1">
                <i>hoặc</i>
              </div>
              <div className="flex flex-col">
                <label for="username" className="font-bold">
                  Tên đăng nhập
                </label>
                <input
                  placeholder="Tên đăng nhập..."
                  id="username"
                  name="username"
                  className="wrap-input relative w-96 h-12 outline-none py-0 px-6 text-lg border 
                  border-black rounded-lg mt-2 mb-2"
                />
                <label for="password" className="font-bold">
                  Mật khẩu
                </label>
                <input
                  placeholder="Mật khẩu..."
                  id="password"
                  name="password"
                  type="password"
                  className="wrap-input relative w-96 h-12 outline-none py-0 px-6 text-lg border 
                  border-black rounded-lg mt-2 mb-2"
                />
                {success && (
                  <div className="text-[#FF0000] mt-3 flex ml-1 items-center">
                    <MdError color="red" />
                    <div className="ml-1">
                      Username hoặc pasword không đúng!
                    </div>
                  </div>
                )}
                <button
                  className="h-12 outline-none py-0 px-6 mt-5 w-40 bg-slate-800 text-white 
                  hover:bg-slate-600 rounded-lg ml-28 font-bold"
                  type="submit"
                >
                  Đăng nhập
                </button>
                <ToastContainer />

                <div className="pt-5 flex justify-center ">
                  <span>Bạn chưa có tài khoản?</span>
                  <Link to="/register" className="text-blue-500 ml-1">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
