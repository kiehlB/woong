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
    <section className='flex flex-1'>
      <div className='w-full flex justify-center items-center'>
        <div className='flex  flex-col   h-[70%] w-[45%]   '>
          <div className='flex justify-between  '>
            <div className='flex flex-col'>
              <h1 className='font-semibold  text-3xl leading-10 text-[#1E2329] font-lato'>
                Welcome to WoongBlog!
              </h1>
              <h2 className='text-sm font-normal text-[#474D57] mt-4 w-[24rem] font-lato'>
                By creating an account you agree to our Terms and Conditions and
                Data Protection Guidelines.
              </h2>
              {children}
            </div>
            <img src='auth.svg' width='300px' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
