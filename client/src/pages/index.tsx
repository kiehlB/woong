import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import { ListTrail } from '../components/animation/Trail';
import useGetUser from '../components/auth/hooks/useWhoAmI';
import Header from '../components/base/Header';
import PageTemplate from '../components/base/PageTemplate';
import PostCard from '../components/common/PostCard';
import Main from '../components/main';
import useGetPosts from '../components/main/hooks/usegetPosts';
import Link from 'next/link';
import PostTitle from '../components/common/PostTitle';

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();

  if (loading) return <div></div>;

  const a = [
    {
      id: 1,
      title: '1',
    },
    {
      id: 2,
      title: '1',
    },
    { id: 3, title: '1' },
    {
      id: 4,
      title: '1',
    },
    { id: 5, title: '1' },
    { id: 6, title: '1' },
    { id: 7, title: '1' },
    { id: 8, title: '1' },
    { id: 9, title: '1' },
  ];

  return (
    <>
      <PageTemplate>
        <Main />
        <div className="w-[71rem] mx-auto  mxl:w-[80%]">
          <PostTitle title="Latest Releases" subtitle="SEE ALL LATEST RELEASES  " />

          {/* <div className="grid  grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2 ">
            {a.map(e => {
              return (
                <div key={e.id} className="border-2">
                  <PostCard article={e} />
                </div>
              );
            })}
          </div> */}

          <div className="py-[3.5rem]">
            <PostTitle title="Latest Releases" subtitle="SEE ALL LATEST RELEASES  " />

            <ListTrail
              css="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2"
              length={a.length}
              options={{
                opacity: 1,
                x: 0,
                from: { opacity: 0, x: -20 },
              }}
              renderItem={index => {
                const article = a[index];
                return (
                  <div className="border-2 rounded-2xl">
                    <Link
                      href={`/article/[id]`}
                      as={`/article/${article.id}`}
                      scroll={false}>
                      <PostCard article={article} />
                    </Link>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default Home;
