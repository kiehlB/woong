import * as React from "react";
import useInputs from "../../lib/hooks/useInputs";
import EyeIcon from "../../static/svg/eye-icon";
import AuthSocialButtonGroup from "./AuthSocialButtonGroup";

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
      <form className='mt-4'>
        <div className='mb-1 text-[#1e2329] text-sm'>Email</div>
        <div className='flex border-[1px] border-[#EAECEF] items-center'>
          <input
            type='text'
            name='name'
            style={{ borderRight: "none" }}
            className='  h-12 rounded py-3 text-[#1e2329]  w-[22rem] focus:border-[#f0b90b] focus:outline-none px-3 '
          />
          <EyeIcon />
        </div>
        <div className='mb-1 text-[#1e2329] text-sm'>Password</div>

        <input
          type='text'
          name='name'
          className='border-[1px] border-[#EAECEF] h-12 rounded py-3 text-[#1e2329]  w-[24rem]  focus:border-[#f0b90b] focus:outline-none px-3  '
        />

        <div className='flex bg-[#fcd435] rounded text-[#202630] mt-6  h-12 w-[24rem] justify-center items-center font-medium  '>
          Reigster
        </div>
      </form>
      <div className='flex mt-2 items-center my-4 w-[24rem] justify-between'>
        <div className='w-[136px] h-[1px] bg-[#EAECEF] '></div>
        <div>or</div>
        <div className='w-[136px] h-[1px] bg-[#EAECEF] '></div>
      </div>
      <AuthSocialButtonGroup />
    </>
  );
};

export default AuthForm;
