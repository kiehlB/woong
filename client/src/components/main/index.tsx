import React, { useRef, useState } from 'react';
import { createMachine, interpret } from 'xstate';
import { useSpring, animated } from 'react-spring';
import { Button } from '../common/Button';
import AddTag from '../../static/svg/addtag';
import Dot from '../common/TagsDot';

export type MainProps = {
  post: any;
};

function Main({ post }: MainProps) {
  const ref = useRef(null);
  const singlePost = post?.findAllPost?.slice(0, 1);

  console.log(singlePost[0]);
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
    <div className="grid grid-cols-2 font-Roboto">
      <div className="pt-[6rem] max-w-[35.5rem] ml-auto pr-[2rem] pl-[1rem] ">
        <h1 className="font-medium text-[#14151A]">LEARN ALL ABOUT</h1>

        <div className="text-[4rem] mb-[1rem] font-medium w-[80%] text-[#14151A] leading-[4.5rem]">
          Learn Web & Security
        </div>

        <div className="border border-[#14151A] w-[2.5rem] h-[2px] mb-[2rem]" />

        <div className="mb-[1.5rem] text-[#474D57] font-normal leading-normal  font-Roboto">
          Your one-stop guide to all things crypto. Whether you're a rookie trying to
          understand mining or a veteran looking to develop a trading strategy, we've got
          you covered.
        </div>
        <Button size="medium" variant="secondary" className="font-Roboto text-sm">
          Start here
        </Button>
      </div>

      <div className="bg-[#F5F5F5]">
        <div
          className="h-full pt-[3rem] pr-[1rem] pb-[3rem] pl-[2rem] max-w-[35.5rem] cursor-pointer"
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
              <img src="/img/image.png" className="w-full h-auto rounded" />
            </div>
            <div className="pt-4 text-[#14151A] leading-7 text-xl  font-medium  ">
              {singlePost[0]?.title}
            </div>
            <div className="text-[#76808F] leading-snug font-normal py-4">
              Jul 12, 2021 8m
            </div>

            <Button
              size="small"
              className="bg-[#02c07633] h-9 flex justify-center items-center  rounded-lg text-[#474D57]">
              <Dot bg="bg-[#02C076]" />
              Beginner
            </Button>
          </animated.div>
        </div>
      </div>
    </div>
  );
}

export default Main;
