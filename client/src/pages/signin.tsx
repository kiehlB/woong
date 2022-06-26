import Auth from "../components/auth/Auth";
import AuthForm from "../components/auth/AuthForm";
import PageTemplate from "../components/base/PageTemplate";
import SslIcon from "../static/svg/ssl-icon";

export type SigninProps = {};

function Signin({}: SigninProps) {
  return (
    <PageTemplate>
      <div className='bg-[#FEF6D8] '>
        <div className='flex justify-center items-center  h-10 shadow'>
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
