import * as React from "react";
import useInputs from "../../lib/hooks/useInputs";
import EyeIcon from "../../static/svg/eye-icon";
import GithubIcon from "../../static/svg/github-icon";
import GoogleIcon from "../../static/svg/google-icon";

export interface AuthProps {
  loading?: boolean;
  onToggleMode?: () => void;
  onSendAuthEmail?: (email: string) => void;
  registered?: boolean | null;
  currentPath?: string;
  email?: string;
  password?: string;
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({
  onToggleMode,
  onSendAuthEmail,
  loading,
  registered,
  currentPath,
  email,
  password,
  children,
}) => {
  return (
    <div className='flex flex-1 h-full'>
      <div className='w-full flex justify-center items-center '>
        <div className='flex  flex-col   h-[70%]   w-[50%]  maxw:w-[60%]  m2xl:w-[75%] mlg:items-center mlg:w-full  '>
          <div className='flex justify-between  '>
            <div className='flex flex-col max-w-sm'>
              <h1 className='text-3xl leading-10  font-semibold text-[#1E2329] font-lato mlg:text-center  px-1'>
                Welcome to WoongBlog!
              </h1>
              <h2 className='text-sm font-normal text-[#474D57] mt-4   font-lato  px-1  mlg:text-center'>
                By creating an account you agree to our Terms and Conditions and
                Data Protection Guidelines.
              </h2>
              {children}
            </div>
            <img src='auth.svg' width='300px' className=' mlg:hidden' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
