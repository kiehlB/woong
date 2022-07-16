import React, { useRef, useState } from 'react';
import { createMachine, interpret } from 'xstate';
import { useSpring, animated } from 'react-spring';

export type MainProps = {};

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 10,
  (x - rect.left - rect.width / 2) / 10,
  1,
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Main() {
  const ref = useRef(null);
  const [xys, set] = useState([0, 0, 1]);

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

  const toggleService = interpret(toggleMachine)
    .onTransition(state => console.log(state.value))
    .start();

  toggleService.send('TOGGLE');

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="pt-[6rem] max-w-[35.5rem] ml-auto pr-[2rem] pl-[1rem] ">
          <h1 className="font-semibold text-[#14151A]">LEARN ALL ABOUT</h1>
          <div className="text-[4rem] mb-[1rem] font-semibold w-[80%] text-[#14151A] leading-[4.5rem]  ">
            Learn Web & Security
          </div>

          <div className="border border-[#14151A] w-[2.5rem] h-[2px] mb-[2rem] " />
          <div className="mb-[1.5rem] text-[#474D57] font-normal leading-normal  font-Roboto">
            Your one-stop guide to all things crypto. Whether you're a rookie trying to
            understand mining or a veteran looking to develop a trading strategy, we've
            got you covered.
          </div>
          <div>Start here</div>
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
              <div className=" text-[#14151A] font-semibold  uppercase mb-[8px]">
                FEATURED
              </div>
              <div className="grid  grid-cols-1">
                <img src="/img/image.png" className="w-full h-auto  rounded" />
              </div>
              <div className="py-[1rem]">
                How to Build a Well-Balanced Crypto Portfolio
              </div>
              <div className="">Jul 12, 2021 8m</div>
              <div className="pt-[1rem]">Beginner</div>
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
