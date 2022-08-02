import '../styles/globals.css';
import '../styles/authInput.scss';
import type { AppProps } from 'next/app';
import { useApollo } from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { NextSeo } from 'next-seo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <NextSeo title="Woong blog" description="welcome to woong blog!" canonical="/" />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
      <div>
        <style global jsx>{`
          html,
          body,
          div#__next {
            height: 100%;
          }
        `}</style>
      </div>
    </>
  );
}

export default MyApp;
