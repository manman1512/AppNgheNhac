import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdError } from 'react-icons/md';

export function Input(props) {
  const { register } = useFormContext();
  // console.log('🚀 ~ file: index.jsx:12 ~ Input ~ register', register);
  const { name, id, placeholder } = props;

  return (
    <input
      {...register(name)}
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
const initialValue = {
  username: '',
  password: '',
  passwordConfirm: '',
};
const schema = yup.object().shape({
  displayName: yup.string().required('Vui lòng nhập Tên hiển thị!'),
  username: yup.string().required('Vui lòng nhập Tên đăng nhập!'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu!!')
    .min(8, 'Mật khẩu phải có độ dài là 8 ký tự!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      'Mật khẩu phải chứa số, chữ in, chữ thường và kí tự đặc biệt!'
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng!'),
});

export default function Register() {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    // console.log(e);
    // e.preventDefault();
    const username = e.username;
    const displayName = e.displayName;
    const password = e.password;
    const passwordConfirm = e.passwordConfirm;
    // console.log(username, password, displayName, passwordConfirm)
    try {
      // console.log(123)
      const res = await axiosClient.post('/auth/register', {
        username,
        password,
        passwordConfirm,
        displayName,
      });

      toast.success('Đăng ký thành công!', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        onClose: () => {
          navigate('/login', { replace: true });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const method = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  // console.log(method);
  return (
    <div
      className="container-register p-5 w-full min-h-screen flex flex-wrap 
      justify-center items-center"
    >
      {/* <FormProvider {...methods}> */}
      <div className=" bg-white pr-14 pl-14 pb-14 pt-10">
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(onSubmit)} >
            <h1 className="text-center pb-4 font-semibold text-3xl ">
              ĐĂNG KÝ
            </h1>
            <div className="flex flex-col">
              <label htmlFor="displayName" className="font-bold">
                Tên hiển thị
              </label>
              <Input
                placeholder="Tên hiển thị..."
                id="displayName"
                name="displayName"
              />

              {method.formState.errors.displayName ? (
                <div className="flex items-center">
                  <MdError color="red" />
                  <div className="text-[#FF0000] ml-1">
                    {method.formState.errors.displayName.message}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <label htmlFor="username" className="font-bold">
                Tên đăng nhập
              </label>
              <Input
                placeholder="Tên đăng nhập..."
                id="username"
                name="username"
                
              />

              {method.formState.errors.username ? (
                <div className="flex items-center">
                  <MdError color="red" />
                  <div className="text-[#FF0000] ml-1">
                    {method.formState.errors.username.message}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <label htmlFor="password" className="font-bold">
                Tạo mật khẩu
              </label>
              <Input
                placeholder="Mật khẩu..."
                id="password"
                name="password"
                className="inp"
              />

              {method.formState.errors.password ? (
                <div className="flex items-center">
                  <MdError color="red" />
                  <div className="text-[#FF0000] ml-1">
                    {method.formState.errors.password.message}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <label htmlFor="passwordConfirm" className="font-bold">
                Nhập lại mật khẩu
              </label>
              <Input
                placeholder="Nhập lại mật khẩu..."
                id="passwordConfirm"
                name="passwordConfirm"
                className="inp"
              />
              {method.formState.errors.passwordConfirm ? (
                <div className="flex items-center">
                  <MdError color="red" />
                  <div className="text-[#FF0000] ml-1">
                    {method.formState.errors.passwordConfirm.message}
                  </div>
                </div>
              ) : (
                <></>
              )}
              
              <button
                className="h-12 outline-none py-0 px-6 mt-5 w-40 bg-slate-800 text-white 
              hover:bg-slate-600 rounded-lg ml-28"
                type="submit"
              >
                Đăng ký
              </button>
              <ToastContainer />

              <div className="pt-9 flex justify-center">
                <span>Bạn đã có tài khoản?</span>
                <Link to="/login" className="text-blue-500 ml-1">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      {/* </FormProvider> */}
    </div>
  );
}
