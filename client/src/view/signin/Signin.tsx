import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { FormEvent } from 'react';
import Auth from '../../components/auth/Auth';
import AuthForm from '../../components/auth/AuthForm';
import PageTemplate from '../../components/base/PageTemplate';
import useGetTags from '../../components/tags/hooks/usegetTags';
import { getNextSeo } from '../../lib/nextSeo';
import Arrow from '../../static/svg/arrow-icon';
import SslIcon from '../../static/svg/ssl-icon';
import useLogin from './hooks/useLogin';

export type SigninProps = {};

function Signin({}: SigninProps) {
  const { inputs, handleChange, login, loginError } = useLogin();
  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await login({
      variables: { input: inputs },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
      },
    });
  };

  return (
    <main>
      <NextSeo
        {...getNextSeo({ title: 'woong blog sign in', description: 'sign in page' })}
      />

      <PageTemplate tag={getTagsData} loading={!getTagsData || getTagsLoading}>
        <section className="bg-[#FEF6D8]">
          <div className="flex justify-center items-center  h-10 shadow">
            <SslIcon />
            <div className="flex text-xs">
              <div className="font-medium font-Roboto">URL verification:&nbsp;</div>
              <div className="text-[#0ECB81] font-Roboto"> https:// </div>
              <div className="text-[#1E2329] font-Roboto">woong.lol</div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-centermt-24 mb-12 mt-24 mxl:mt-20 mxl:mb-20">
          <Auth
            svg="login.svg"
            form={
              <AuthForm
                inputs={inputs}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                authError={loginError}
                auth="Login"
                isRegister="Register now"
                linkTo="/"
              />
            }
            bottom={
              <div className="flex mt-6 items-center text-[0.875rem] font-medium font-Cabin text-[#C99400] ml-1 cursor-pointer">
                <Link href="/signup"> Register now</Link>
                <Arrow />
              </div>
            }
          />
        </section>
      </PageTemplate>
    </main>
  );
}

export default Signin;
