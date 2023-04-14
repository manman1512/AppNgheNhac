import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function EditUser({ showModalPass, onClose }) {
  const initialValue = {
    password: '',
    passwordConf: '',
  };
  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Vui lòng nhập Mật khẩu!')
      .min(6, 'Mật khẩu phải có độ dài từ 8 ký tự trở lên!')
      .max(15, 'Mật khẩu không được quá 15 ký tự!')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Mật khẩu phải chứa số, chữ in, chữ thường và kí tự đặc biệt!'
      ),
      passwordConf: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng!'),
  });

  const method = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  return (
    <React.Fragment>
      <div>
        {showModalPass && (
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
                  <h3 className="text-2xl font-bold">Thay đổi mật khẩu</h3>
                </div>
                {/*body*/}
                <FormProvider {...method}>
                <form
                  className="flex flex-col text-lg"
                  // onSubmit={method.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col justify-center items-center border-2 p-4 bg-[#F5F5F6]">
                    <div className="mt-3">
                      <label htmlFor="passwordOld" className="mt-3 mr-[109px] ">
                        Mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        name="passwordOld"
                        id="passwordOld"
                        // placeholder="Nhập mật khẩu cũ"
                        className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        // onChange={(e) => setPasswordOld(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="password" className="mt-3 mr-24 ">
                        Mật khẩu Mới
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        // placeholder="Nhập mật khẩu mới.."
                        className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        // onChange={(e) => setPassword(e.target.value)}
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
                        // onChange={(e) => setPasswordConf(e.target.value)}
                      />
                      {method.formState.errors.passwordConf ? (
                        <div className="flex items-center">
                          <MdError color="red" />
                          <div className="text-[#FF0000] ml-1">
                            {method.formState.errors.passwordConf.message}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

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
                </FormProvider>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
        )}
      </div>
    </React.Fragment>
  );
}
