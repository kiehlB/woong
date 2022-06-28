import * as React from 'react';
import useInputs from '../../lib/hooks/useInputs';
import EyeIcon from '../../static/svg/eye-icon';
import AuthSocialButtonGroup from './AuthSocialButtonGroup';
import { motion } from 'framer-motion';
import useRegister from './hooks/useRegister';

export interface AuthFormProps {
  inputs: any;
  handleChange: any;
  handleSubmit: any;
  authError: any;
}

const AuthForm: React.FC<AuthFormProps> = ({
  inputs,
  handleChange,
  handleSubmit,
  authError,
}) => {
  return (
    <>
      <div className="mt-2 text-xs text-red-600 mlg:text-center">
        {authError?.graphQLErrors.map(({ message }, i) => (
          <span key={i}>* {message}</span>
        ))}
      </div>
      <form className="mt-8 px-1" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div className="form">
            <input
              type="text"
              id="email"
              name="email"
              className="form__input"
              autoComplete="off"
              placeholder=" "
              value={inputs?.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="form__label text-zinc-400 font-semibold  font-lato ">
              Email
            </label>
          </div>
        </div>

        <div className="flex items-center mt-8">
          <div className="form">
            <input
              type="password"
              id="password"
              className="form__input"
              autoComplete="off"
              name="password"
              placeholder=" "
              value={inputs?.password}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="form__label    text-zinc-400 font-semibold  font-lato">
              Password
            </label>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          className="flex bg-[#fcd435] rounded text-[#202630] mt-6  h-12   justify-center items-center      tracking-widest w-full ">
          Reigster
        </motion.button>
      </form>
      <div className="flex mt-4 items-center  justify-between px-1">
        <div className="w-[136px] h-[1px] bg-[#EAECEF] "></div>
        <div className="text-[#707a8a] font-semibold">Or</div>
        <div className="w-[136px] h-[1px] bg-[#EAECEF] "></div>
      </div>
      <AuthSocialButtonGroup />
    </>
  );
};

export default React.memo(AuthForm);
