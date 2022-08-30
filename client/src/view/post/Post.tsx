import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRef, useState, useEffect, useCallback } from 'react';
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
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

function Realistic() {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <>
      {/* @ts-ignore */}
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <button onClick={fire} className="flex justify-center">
        <span className="w-[100px] bg-[#404663] shadow-lg p-6 text-[1.5rem] rounded-full flex justify-center items-center">
          🎉
        </span>
      </button>
    </>
  );
}

export type PostProps = {};

function Post({}: PostProps) {
  const [isComplete, setIsComplete] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => yRange.onChange(v => setIsComplete(v >= 1)), [yRange]);

  console.log(pathLength);

  const { singlePostLoding, singlePostError, singlePostData } = useGetPost();
  /// fixed mt-[10%] bg-[#404663] shadow-lg p-6 text-[1.5rem] rounded-full flex justify-center items-center
  return (
    <PageTemplate>
      <div className="flex">
        <div className="flex justify-center w-[30%]">
          <div className="w-full">
            <div className="fixed flex flex-col w-[30%]">
              <Realistic />
            </div>
          </div>
          <div className="fixed mt-[20%] text-[1.5rem]">0</div>
        </div>
        <div className="flex flex-col w-[40%] mx-auto  justify-center items-center mt-4">
          <div className="flex w-full">
            {singlePostData?.findSinglePost?.posts_tags?.map(e => (
              <HeaderTopicItem name={e.tag.name_filtered} size="small" />
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
        <div className="flex justify-center border w-[30%]">
          <div className="fixed mt-[10%]">dd</div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default Post;
