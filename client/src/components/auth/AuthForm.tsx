import * as React from 'react';
import useInputs from '../../lib/hooks/useInputs';
import EyeIcon from '../../static/svg/eye-icon';
import AuthSocialButtonGroup from './AuthSocialButtonGroup';
import { motion } from 'framer-motion';

import { ApolloError } from '@apollo/client';

interface inputProps {
  password: string | number | readonly string[];
  email: string | number | readonly string[];
}

export interface AuthFormProps {
  inputs: inputProps;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  authError: ApolloError;
  auth: string;
  isRegister: string;
  linkTo: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  inputs,
  handleChange,
  handleSubmit,
  authError,
  auth,
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
            <label htmlFor="email" className="form__label text-zinc-400    font-Roboto  ">
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
              className="form__label    text-zinc-400  font-Roboto ">
              Password
            </label>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          className="flex bg-[#fcd435] rounded text-[#202630] mt-6  h-12   justify-center items-center  font-Cabin   tracking-widest w-full ">
          {auth}
        </motion.button>
      </form>
      <div className="flex mt-4 items-center  justify-between px-1">
        <div className="w-[136px] h-[1px] bg-[#EAECEF] "></div>
        <div className="text-[#707a8a]  font-Roboto">Or</div>
        <div className="w-[136px] h-[1px] bg-[#EAECEF] "></div>
      </div>
      <AuthSocialButtonGroup />
    </>
  );
};

export default React.memo(AuthForm);
