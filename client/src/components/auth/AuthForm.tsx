import * as React from "react";
import useInputs from "../../lib/hooks/useInputs";
import EyeIcon from "../../static/svg/eye-icon";
import AuthSocialButtonGroup from "./AuthSocialButtonGroup";
import { motion } from "framer-motion";

export interface AuthFormProps {
  loading?: boolean;
  onToggleMode?: () => void;
  onSendAuthEmail?: (email: string) => void;
  registered?: boolean | null;
  currentPath?: string;
  email?: string;
  password?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onToggleMode,
  onSendAuthEmail,
  loading,
  registered,
  currentPath,
  email,
  password,
}) => {
  const [inputs, onChange] = useInputs({
    email,
    password,
  });
  const onSubmit = (email: string) => {};

  return (
    <>
      <form className='mt-8 px-1'>
        <div className='flex items-center'>
          <div className='form'>
            <input
              type='text'
              id='email'
              className='form__input'
              autoComplete='off'
              placeholder=' '
            />
            <label
              htmlFor='email'
              className='form__label text-zinc-400 font-semibold  font-lato '
            >
              Email
            </label>
          </div>
        </div>
        <div className='flex items-center mt-8'>
          <div className='form'>
            <input
              type='text'
              id='email'
              className='form__input'
              autoComplete='off'
              placeholder=' '
            />
            <label
              htmlFor='email'
              className='form__label    text-zinc-400 font-semibold  font-lato'
            >
              Password
            </label>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          className='flex bg-[#fcd435] rounded text-[#202630] mt-6  h-12   justify-center items-center font-medium  font-main tracking-widest '
        >
          Reigster
        </motion.div>
      </form>
      <div className='flex mt-4 items-center  justify-between px-1'>
        <div className='w-[136px] h-[1px] bg-[#EAECEF] '></div>
        <div className='text-[#707a8a] font-semibold'>Or</div>
        <div className='w-[136px] h-[1px] bg-[#EAECEF] '></div>
      </div>
      <AuthSocialButtonGroup />
    </>
  );
};

export default AuthForm;
