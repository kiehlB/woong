import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import PageTemplate from '../../components/base/PageTemplate';
import useGetPosts from '../../components/main/hooks/usegetPosts';
import useGetPost from './hooks/useGerPost';
import HeaderTopicItem from '../../components/base/HeaderTopicItem';
import HeaderMenuItems from '../../components/base/HeaderMenuItem';

export type PostProps = {};

function Post({}: PostProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => yRange.onChange(v => setIsComplete(v >= 1)), [yRange]);

  console.log(pathLength);

  const { singlePostLoding, singlePostError, singlePostData } = useGetPost();

  return (
    <PageTemplate>
      <div className="flex">
        <div className="sticky top-0 flex justify-center border w-[30%]">
          <div>Like</div>
        </div>
        <div className="flex flex-col w-[40%] mx-auto  justify-center items-center">
          <div className="flex w-full">
            {singlePostData?.findSinglePost?.posts_tags?.map(e => (
              <HeaderTopicItem name={e.tag.name_filtered} />
            ))}
          </div>
          <svg className="progress-icon" viewBox="0 0 60 60">
            <motion.path
              fill="none"
              strokeWidth="5"
              stroke="red"
              strokeDasharray="0 1"
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{
                pathLength,
                rotate: 90,
                translateX: 5,
                translateY: 5,
                scaleX: -1, // Reverse direction of line animation
              }}
            />
            <motion.path
              fill="none"
              strokeWidth="5"
              stroke="white"
              d="M14,26 L 22,33 L 35,16"
              initial={false}
              strokeDasharray="0 1"
              animate={{ pathLength: isComplete ? 1 : 0 }}
            />
          </svg>
          <div
            dangerouslySetInnerHTML={{ __html: singlePostData?.findSinglePost?.body }}
          />
        </div>
        <div className="border w-[30%]">dd</div>
      </div>
    </PageTemplate>
  );
}

export default Post;
