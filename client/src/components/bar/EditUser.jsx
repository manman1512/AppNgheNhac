import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Context } from '../../store/Context';
import axiosClient from '../../axiosClient';

const initialValue = {
  password: '',
  passwordConf: '',
  passwordOld: '',
};
const schema = yup.object().shape({
  passwordOld: yup
    .string()
    .required('Vui lòng nhập mật khẩu cũ!')
    .test('match', 'Mật khẩu cũ không đúng!', function (value) {
      return value === this.parent.passwordOld;
    }),
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

export default function EditUser({ showModalPass, onClose }) {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [state, dispatch] = useContext(Context);
  const [password, setPassword] = useState('');
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const onSubmit = async (e) => {
    const password = e.password;
    const passwordConf = e.passwordConf;
    const passwordOld = e.passwordOld;

    dispatch({ type: 'UPDATE_START' });
    const updateUser = {
      userId: state.user._id,
      password,
      passwordConf,
      passwordOld,
    };

    try {
      const res = await axiosClient.put('/users/update/', updateUser);
      toast.success('Cập nhật thành công!', {
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
        },
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data.updateUser });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };
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
                  <form
                    className="flex flex-col text-lg"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-col justify-center items-center border-2 p-4 bg-[#F5F5F6]">
                      <div className="mt-3">
                        <label
                          htmlFor="passwordOld"
                          className="mt-3 mr-[109px] "
                        >
                          Mật khẩu cũ
                        </label>
                        <input
                          {...register('passwordOld')}
                          type="password"
                          // name="passwordOld"
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
                          {...register('password')}
                          type="password"
                          id="password"
                          // placeholder="Nhập mật khẩu mới.."
                          className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        />
                        {formState.errors.password ? (
                          <div className="flex items-center">
                            <MdError color="red" />
                            <div className="text-[#FF0000] ml-1">
                              {formState.errors.password.message}
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
                          {...register('passwordConf')}
                          type="password"
                          id="passwordConf"
                          // placeholder="Nhập mật khẩu mới.."
                          className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                        />
                        {formState.errors.passwordConf ? (
                          <div className="flex items-center">
                            <MdError color="red" />
                            <div className="text-[#FF0000] ml-1">
                              {formState.errors.passwordConf.message}
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
                    </div>
                  </form>
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
