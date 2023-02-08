import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { Input } from '../register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try{
      const res = await axiosClient.post('/auth/login', {
        username,
        password
      });
      console.log(res)
      const token = res.data.accessToken;
      localStorage.setItem('accessToken', token);
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

    }catch (error) {
      console.error(error)
    }

  }
  return (
    <div>
      <div
        className="container-register p-5 w-full min-h-screen flex flex-wrap 
        justify-center items-center"
      >
        <div className="border-2 bg-white rounded-xl pr-14 pl-14 pb-14 pt-10 border-gray-500">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="text-center pb-4 font-semibold text-3xl ">
                ĐĂNG NHẬP
              </div>
            </div>
            <div className="flex flex-col">
              <label for="username" className="font-bold">
                Tên đăng nhập
              </label>
              <Input
                placeholder="Tên đăng nhập..."
                id="username"
                name="username"
              />
              <label for="password" className="font-bold">
                Mật khẩu
              </label>
              <Input
                placeholder="Mật khẩu..."
                id="password"
                name="password"
                className="inp"
              />

              <button
                className="h-12 outline-none py-0 px-6 mt-5 w-40 bg-slate-800 text-white 
                hover:bg-slate-600 rounded-lg ml-28"
                type="submit"
              >
                Đăng nhập
              </button>
              <ToastContainer />
              {
                //   success && (
                //   <span className="text-red-500 mt-3 flex ml-1">
                //     <div>
                //       <b>Username hoặc pasword không đúng!</b>
                //     </div>
                //   </span>
                // )
              }
              <div className="pt-9 flex justify-center">
                <span>Bạn chưa có tài khoản?</span>
                <Link to="/register" className="text-blue-500 ml-1">
                  Đăng ký
                </Link>
              </div>
            </div>
          </form>
        </div>
        {/* </FormProvider> */}
      </div>
    </div>
  );
}
