import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdError } from 'react-icons/md';
import LogoHeader from '../../images/LogoHeader.png';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillGoogleCircle } from 'react-icons/ai';

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
  username: yup
    .string()
    .min(4, 'Tên đăng nhập phải có độ dài từ 4 kí tự trở lên!')
    .required('Vui lòng nhập Tên đăng nhập!'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu!')
    .min(6, 'Mật khẩu phải có độ dài từ 8 ký tự trở lên!')
    .max(15, 'Mật khẩu không được quá 15 ký tự!')
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
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
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
      className="container-register p-2 w-full min-h-screen flex flex-wrap 
      justify-center items-center"
    >
      {/* <FormProvider {...methods}> */}
      <div className=" bg-white ">
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center">
              <img className="w-[80px] h-[80px]" src={LogoHeader} alt="" />
              <div className="font-bold text-3xl">SongSphere</div>
            </div>
            <h1 className="text-center pb-4 font-bold text-xl">
              Đăng ký miễn phí với
            </h1>
            <div>
              <div
                className="flex items-center justify-center bg-[#405A93] text-white rounded-2xl
              p-2"
              >
                <FaFacebookSquare />
                <p className="ml-1 font-bold">Đăng ký bằng Facebook</p>
              </div>
              <div
                className="flex items-center justify-center rounded-2xl border-spacing-2 
              border-2 border-gray-500 p-2 mt-2"
              >
                <AiFillGoogleCircle color="red" />
                <p className="ml-1 font-bold">Đăng ký bằng Google</p>
              </div>
            </div>

            <div className="flex justify-center mt-1">
              <i>hoặc</i>
            </div>

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
                <div></div>
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
                <div></div>
              )}

              <label htmlFor="password" className="font-bold">
                Mật khẩu
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
                <div></div>
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
                <div></div>
              )}

              {success && (
                <div className="text-[#FF0000] mt-3 flex ml-1 items-center justify-center">
                  <MdError color="red" />
                  <div className="ml-1">Tên đăng nhập đã tồn tại!</div>
                </div>
              )}

              <button
                className="h-12 outline-none py-0 px-6 mt-5 w-40 bg-slate-800 text-white 
              hover:bg-slate-600 rounded-lg ml-28 font-bold"
                type="submit"
              >
                Đăng ký
              </button>
              <ToastContainer />

              <div className="pt-5 flex justify-center ">
                <span>Bạn đã có tài khoản?</span>
                <Link to="/login" className="text-blue-500 ml-1 ">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      {/* </FormProvider> */}
    </div>
  )
}
