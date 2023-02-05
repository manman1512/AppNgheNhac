import React from 'react';
import { Link } from 'react-router-dom';

export function Input(props) {
  const { name, id, placeholder } = props;

  return (
    <input
      name={name}
      id={id}
      placeholder={placeholder}
      className="wrap-input relative w-96 h-12 outline-none py-0 px-6 text-lg border border-black
      rounded-lg mt-2 mb-2"
      type={
        name === 'password' || name === 'passwordConfirm' ? 'password' : 'text'
      }
    />
  );
}

export default function Register() {
  return (
    <div
      className="container-register p-5 w-full min-h-screen flex flex-wrap 
      justify-center items-center"
    >
      {/* <FormProvider {...methods}> */}
      <div className="border-2 bg-white rounded-xl pr-14 pl-14 pb-14 pt-10 border-gray-500">
        <form>
          <h1 className="text-center pb-4 font-semibold text-3xl ">ĐĂNG KÝ</h1>
          <div className="flex flex-col">
            <label for="displayName" className="font-bold">
              Tên hiển thị
            </label>
            <Input
              placeholder="Tên hiển thị..."
              id="displayName"
              name="displayName"
            />
            <label for="username" className="font-bold">
              Tên đăng nhập
            </label>
            <Input
              placeholder="Tên đăng nhập..."
              id="username"
              name="username"
            />
            <label for="password" className="font-bold">
              Tạo mật khẩu
            </label>
            <Input
              placeholder="Mật khẩu..."
              id="password"
              name="password"
              className="inp"
            />
            <label for="passwordConfirm" className="font-bold">
              Nhập lại mật khẩu
            </label>
            <Input
              placeholder="Nhập lại mật khẩu..."
              id="passwordConfirm"
              name="passwordConfirm"
              className="inp"
            />
            {/* {lengthPass && (
              <span className="text-red-500 mt-3 flex ml-1">
                <div>
                  <b>Mật khẩu phải lớn hơn 8 ký tự!</b>
                </div>
              </span>
            )} */}
            {
              //   successPass && (
              //   <span className="text-red-500 mt-3 flex ml-1">
              //     <div>
              //       <b>Mật khẩu nhập lại không đúng!</b>
              //     </div>
              //   </span>
              // )
            }
            <button
              className="h-12 outline-none py-0 px-6 mt-5 w-40 bg-slate-800 text-white 
              hover:bg-slate-600 rounded-lg ml-28"
              type="submit"
            >
              Đăng ký
            </button>

            <div className="pt-9 flex justify-center">
              <span>Bạn đã có tài khoản?</span>
              <Link to="/login" className="text-blue-500 ml-1">
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
      {/* </FormProvider> */}
    </div>
  );
}
