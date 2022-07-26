import Auth from '../components/auth/Auth';
import AuthForm from '../components/auth/AuthForm';
import PageTemplate from '../components/base/PageTemplate';
import useRegister from '../components/auth/hooks/useRegister';
import Arrow from '../static/svg/arrow-icon';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
  const { inputs, handleChange, handleSubmit, registerError } = useRegister();

  return (
    <>
      <NextSeo title="woong blog sign up" description="sign up page" />
      <PageTemplate>
        <Auth
          form={
            <AuthForm
              inputs={inputs}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              authError={registerError}
              auth="Register"
              isRegister="Sign up for an entity account?"
              linkTo="Log In"
            />
          }
          bottom={
            <div className="mt-6 text-[#707A8A] text-[0.875rem] font-medium font-Cabin ">
              Already registered?
              <span className="text-[#C99400] ml-1 cursor-pointer">
                <Link href="/signin"> Log In </Link>
              </span>
            </div>
          }
        />
      </PageTemplate>
    </>
  );
}

export default SignUp;
