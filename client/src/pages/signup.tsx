import Header from "../components/base/Header";
import PageTemplate from "../components/base/PageTemplate";
import EyeIcon from "../static/svg/eye-icon";
import GithubIcon from "../static/svg/github-icon";
import GoogleIcon from "../static/svg/google-icon";
import SslIcon from "../static/svg/ssl-icon";

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
  return (
    <PageTemplate>
      <div className='flex flex-col h-full'>
        <div className='bg-[#FEF6D8] '>
          <div className='flex justify-center items-center  h-10'>
            <SslIcon />
            <div className='flex text-xs'>
              <div className='font-medium'>URL verification:&nbsp;</div>
              <div className='text-[#0ECB81]'> https:// </div>
              <div className='text-[#1E2329]'>woongblog.io</div>
            </div>
          </div>
        </div>

        <div className='flex flex-1'>
          <div className='w-full flex justify-center items-center'>
            <div className='flex  flex-col   h-[70%] w-[45%]   '>
              <div className='flex justify-between  '>
                <div className='flex flex-col'>
                  <div className='font-semibold  text-3xl leading-10 text-[#1E2329] font-lato'>
                    Welcome to WoongBlog!
                  </div>
                  <div className='text-sm font-normal text-[#474D57] mt-4 w-[24rem] font-lato'>
                    By creating an account you agree to our Terms and Conditions
                    and Data Protection Guidelines.
                  </div>

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
                  <div className='flex bg-white rounded text-[#202630] border-[1px] h-12 w-[24rem] justify-center items-center font-medium '>
                    <div className='px-4'>
                      <GithubIcon />
                    </div>
                    Continue with Github
                  </div>

                  <div className='flex bg-white rounded text-[#202630] border-[1px] h-12 w-[24rem] justify-center items-center mt-4 font-medium'>
                    <div className='px-4'>
                      <GoogleIcon />
                    </div>
                    Continue with Google
                  </div>
                  <div className='flex mt-6 text-[#707A8A] font-xs font-medium'>
                    Already registered? &nbsp;
                    <div className='text-[#C99400]'> Log In</div>
                  </div>
                </div>
                <img src='auth.svg' width='300px' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default SignUp;
