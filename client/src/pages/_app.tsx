import '../styles/globals.css';
import '../styles/authInput.scss';
import type { AppProps } from 'next/app';
import { useApollo } from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { NextSeo } from 'next-seo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { NextUIProvider } from '@nextui-org/react';
import { ErrorBoundary } from 'react-error-boundary';
import { AppErrorFallback } from '../components/error/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <React.Fragment>
      <ErrorBoundary
        fallbackRender={fallbackProps => {
          return <AppErrorFallback {...fallbackProps} errorInfo={errorInfo} />;
        }}>
        <NextSeo title="Woong blog" description="welcome to woong blog!" canonical="/" />
        <NextUIProvider>
          <Provider store={store}>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Provider>
        </NextUIProvider>
        <div>
          <style global jsx>{`
            html,
            body,
            div#__next {
              height: 100%;
            }
          `}</style>
        </div>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default MyApp;
