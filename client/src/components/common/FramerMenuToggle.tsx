import { motion } from 'framer-motion';
import { MouseEventHandler } from 'react';

export type MenuToggleProps = {
  toggle: MouseEventHandler<HTMLButtonElement>;
  isOpen?: boolean;
};

export type VariantsProps = {
  closed?: { d?: string; opacity?: number };
  open: { d?: string; opacity?: number };
};

export type PathProps = {
  variants?: VariantsProps;
  d?: string;
  transition?: { duration: number };
};

const Path = (props: PathProps) => (
  <motion.path
    fill="white"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

function MenuToggle({ toggle, isOpen }: MenuToggleProps) {
  return (
    <button
      className={`button ${isOpen == false ? '' : 'ml-[1.5rem]'} `}
      onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23" fill="#fff">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
}

export default MenuToggle;
