import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import PageTemplate from '../../components/base/PageTemplate';
import useGetPosts from '../../components/main/hooks/usegetPosts';
import useGetPost from './hooks/useGerPost';

export type PostProps = {};

function Post({}: PostProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const { singlePostLoding, singlePostError, singlePostData } = useGetPost();

  return (
    <PageTemplate>
      <svg id="progress" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="indicator"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ul ref={ref}>
        <div className="">
          <div>
            {singlePostData?.findSinglePost?.posts_tags?.map(e => (
              <div className="mr-4">{e.tag.name_filtered}</div>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: 'd' }} />
        </div>
      </ul>
    </PageTemplate>
  );
}

export default Post;
