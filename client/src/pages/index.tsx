import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import useGetUser from '../components/auth/hooks/useWhoAmI';
import Header from '../components/base/Header';
import PageTemplate from '../components/base/PageTemplate';
import useGetPosts from '../components/main/hooks/usegetPosts';

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();

  console.log(data);
  return (
    <>
      <PageTemplate>
        <div
          dangerouslySetInnerHTML={{ __html: data?.findAllPost?.map(e => e.body) }}></div>
      </PageTemplate>
    </>
  );
};

export default Home;
