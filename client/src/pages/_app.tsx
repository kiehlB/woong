import "../styles/globals.css";
import "../styles/authInput.scss";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <>
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
