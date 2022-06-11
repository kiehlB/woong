import "../styles/globals.css";
// import "../styles/button.scss";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
