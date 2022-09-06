import * as React from 'react';

export interface AuthProps {
  form: React.ReactNode;
  bottom: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ form, bottom }) => {
  return (
    <div className="">
      <div className="w-full flex justify-center items-center ">
        <div className="flex  flex-col   h-[70%]   w-[50%]  maxw:w-[60%]  m2xl:w-[75%] mlg:items-center mlg:w-full  ">
          <div className="flex justify-between  ">
            <div className="flex flex-col max-w-sm">
              <h1 className="text-3xl leading-10 font-Roboto font-medium text-[#1E2329] mlg:text-center  px-1">
                Welcome to WoongBlog!
              </h1>
              <h2 className="text-sm font-light text-[#474D57] mt-4 font-Roboto  px-1  mlg:text-center">
                By creating an account you agree to our Terms and Conditions and Data
                Protection Guidelines.
              </h2>
              {form}
            </div>
            <img src="auth.svg" width="300px" className=" mlg:hidden" />
          </div>
          {bottom}
        </div>
      </div>
    </div>
  );
};

export default Auth;
