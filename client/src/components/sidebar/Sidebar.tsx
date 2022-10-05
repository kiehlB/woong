import clsx from 'clsx';
import { motion, useCycle } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useClientDimensions from '../../lib/hooks/useClientDimensions';
import MenuToggle from '../common/FramerMenuToggle';
import { Navigation } from './Nav';

export const useDimensions = ref => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

export type SidebarProps = {};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

function Sidebar({}: SidebarProps) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  // const [containerRef, { height: containerHeight }] = useClientDimensions();

  console.log(height);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={clsx(' ', {
        fixed: isOpen == true,
      })}
      ref={containerRef}>
      <motion.div variants={sidebar} className="background" />
      <Navigation />

      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}

export default Sidebar;
