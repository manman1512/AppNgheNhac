import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../register';

export default function Login() {
  return (
    <div>
      <div
        className="container-register p-5 w-full min-h-screen flex flex-wrap 
        justify-center items-center"
      >
        <div className="border-2 bg-white rounded-xl pr-14 pl-14 pb-14 pt-10 border-gray-500">
          <form action="">
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
