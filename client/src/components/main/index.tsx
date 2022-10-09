import React, { useRef, useState } from 'react';
import { createMachine, interpret } from 'xstate';
import { useSpring, animated } from 'react-spring';
import { Button } from '../common/Button';
import Dot from '../common/TagsDot';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { Post } from '../../types/apolloComponent';
import { Grid } from '../common/Grid';

export type MainProps = {
  post: {
    findAllPost: Post[];
  };
};

function Main({ post }: MainProps) {
  const ref = useRef(null);
  const singlePost = post ? post?.findAllPost?.slice(-1)[0] : '';

  const [xys, set] = useState([0, 0, 1]);

  const calc = (x, y, rect) => [
    -(y - rect.top - rect.height / 2) / 10,
    (x - rect.left - rect.width / 2) / 10,
    1,
  ];

  const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const config = {
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,
    easing: t => t,
  };

  const props = useSpring({ xys, config });

  const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: { on: { TOGGLE: 'active' } },
      active: { on: { TOGGLE: 'inactive' } },
    },
  });

  // const toggleService = interpret(toggleMachine)
  //   .onTransition(state => console.log(state.value))
  //   .start();

  // toggleService.send('TOGGLE');

  return (
    <Grid className="mb-14">
      <div className="pt-[6rem] max-w-[35.6rem] ml-auto pr-[2rem] pl-[1rem] mmd:max-w-full mmd:pb-8">
        <h1 className="font-medium text-[#14151A]">LEARN ALL ABOUT</h1>

        <div className="text-[4rem] mb-[1rem] font-medium w-[80%] text-[#14151A] leading-[4.5rem]">
          {`Learn Web & Security`}
        </div>

        <div className="border border-[#14151A] w-[2.5rem] h-[2px] mb-[2rem]" />

        <div className="mb-[1.5rem] text-[#474D57] font-normal leading-normal  font-Roboto">
          {`My 0 blog posts (and counting) have been read 0 times by 0 people. There you'll find blogs about JavaScript, TypeScript, React, Testing, your career, and and more.`}
        </div>
        <Button size="medium" variant="secondary" className="font-Roboto text-sm">
          See more
        </Button>
      </div>

      <Link href={singlePost ? `/post/${singlePost.id}` : ''}>
        <div className="bg-[#F5F5F5]">
          <div
            className="h-full pt-[3rem] pr-[1rem] pb-[3rem] pl-[2rem] max-w-[35.5rem] cursor-pointer mmd:mx-auto mmd:pl-[0rem] mmd:pr-[0rem]"
            ref={ref}>
            <animated.div
              style={{ transform: props.xys.to(trans) }}
              onMouseLeave={() => set([0, 0, 1])}
              onMouseMove={e => {
                const rect = ref.current.getBoundingClientRect();
                set(calc(e.clientX, e.clientY, rect));
              }}>
              <div className=" text-[#14151A] font-medium  uppercase mb-[8px]">
                FEATURED
              </div>
              <div className="grid  grid-cols-1">
                {(singlePost as any)?.thumbnail ? (
                  <img
                    src={(singlePost as any)?.thumbnail}
                    className="w-full h-auto rounded-xl max-h-[18.25rem] min-h-[18.25rem]"
                  />
                ) : (
                  <img
                    src="img/noImg.jpg"
                    className="w-full h-auto rounded-xl max-h-[18.25rem] min-h-[18.25rem] object-cover "
                  />
                )}
              </div>
              {singlePost ? (
                <>
                  <div className="pt-4 text-[#14151A] leading-7 text-xl font-light  font-Roboto line-clamp-3 break-all">
                    {singlePost?.title}
                  </div>

                  <div className="flex items-center">
                    <div className="text-[#76808F] leading-snug font-normal py-4">
                      {DateTime.fromISO(singlePost.created_at)
                        .toLocaleString()
                        .slice(0, -1)}
                    </div>

                    <div className="flex items-center ml-4 text-[#76808F]">
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
                      </svg>
                      <div className="ml-1">{singlePost?.post_likes.length}</div>
                    </div>
                  </div>

                  <Button
                    size="small"
                    difficulty={singlePost.difficulty}
                    className="h-9 flex justify-center items-center rounded-lg text-[#474D57]">
                    <Dot css={singlePost.difficulty} />
                    {singlePost.difficulty}
                  </Button>
                </>
              ) : (
                ''
              )}
            </animated.div>
          </div>
        </div>
      </Link>
    </Grid>
  );
}

export default Main;
