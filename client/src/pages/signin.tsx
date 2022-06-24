import Auth from "../components/auth/Auth";
import AuthForm from "../components/auth/AuthForm";
import Header from "../components/base/Header";
import PageTemplate from "../components/base/PageTemplate";
import View from "../components/View";
import EyeIcon from "../static/svg/eye-icon";
import GithubIcon from "../static/svg/github-icon";
import GoogleIcon from "../static/svg/google-icon";
import SslIcon from "../static/svg/ssl-icon";

export type SigninProps = {};

function Signin({}: SigninProps) {
  return (
    <PageTemplate>
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
      <Auth>
        <AuthForm />
      </Auth>
    </PageTemplate>
  );
}

export default Signin;
