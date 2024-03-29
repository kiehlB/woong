import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
  fromPromise
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { concatPagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { refreshMutation } from './graphql/users';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const TOKEN_EXPIRED = 'jwt expired';
const NO_AUTH_TOKEN = 'No auth token' 


const linkOnError = onError(({ graphQLErrors, operation, forward, response }) => {
  if (!apolloClient) return;
  console.log(graphQLErrors?.[0].message)
  if (graphQLErrors?.[0].message === TOKEN_EXPIRED) {
    const refresh = fromPromise(
      apolloClient
        .mutate({ mutation: refreshMutation })
        .then(({ data }) => {
          console.log(data)
          return data.refresh.ok;
        }),
    );

    return refresh.filter((result) => result).flatMap(() => forward(operation));
  }
  if (graphQLErrors?.[0].message === NO_AUTH_TOKEN) {
    response.errors = null;
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_URL, // Server URL (must be absolute)
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([linkOnError,httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: { cache: { extract: () => any } },
  pageProps: { props: { [x: string]: any } },
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: { [x: string]: any }) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
