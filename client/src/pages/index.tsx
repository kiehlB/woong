import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import { GET_Posts } from '../lib/graphql/post';
import { FindAllPostQuery } from '../types/apolloComponent';

export { default } from '../view/home';

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  const apolloClient = initializeApollo();
  const postData = await apolloClient.query<FindAllPostQuery>({
    query: GET_Posts,
  });
  return { props: { data: postData?.data } };
};
