import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import useGetUser from '../components/auth/hooks/useWhoAmI';
import Header from '../components/base/Header';
import PageTemplate from '../components/base/PageTemplate';
import PostCard from '../components/common/PostCard';
import Main from '../components/main';
import useGetPosts from '../components/main/hooks/usegetPosts';

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();

  if (loading) return <div></div>;

  return (
    <>
      <PageTemplate>
        <Main />
        <PostCard />
      </PageTemplate>
    </>
  );
};

export default Home;
