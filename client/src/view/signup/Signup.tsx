import Link from 'next/link';
import { NextSeo } from 'next-seo';
import PageTemplate from '../../components/base/PageTemplate';
import Auth from '../../components/auth/Auth';
import AuthForm from '../../components/auth/AuthForm';
import useRegister from './hooks/useRegister';
import { getNextSeo } from '../../lib/nextSeo';
import useGetTags from '../../components/tags/hooks/usegetTags';
import { FormEvent } from 'react';

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
  const { inputs, handleChange, signUp, registerError } = useRegister();
  const { loading: getTagsLoading, data: getTagsData } = useGetTags();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({
      variables: { input: inputs },
    });
  };

  return (
    <main>
      <NextSeo
        {...getNextSeo({ title: 'woong blog sign up', description: 'sign up page' })}
      />
      <PageTemplate tag={getTagsData} loading={getTagsLoading}>
        <section className="flex flex-col justify-center mt-24 mb-12 mxl:mt-20 mxl:mb-20">
          <Auth
            svg="register.svg"
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
              <h2 className="mt-6 text-[#707A8A] text-[0.875rem] font-medium font-Cabin">
                Already registered?
                <span className="text-[#C99400] ml-1 cursor-pointer">
                  <Link href="/signin"> Log In </Link>
                </span>
              </h2>
            }
          />
        </section>
      </PageTemplate>
    </main>
  );
}

export default SignUp;
