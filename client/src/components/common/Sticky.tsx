import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getScrollTop } from '../../lib/utils';

export interface StickyProps {
  top: number;
  className?: string;
  children: React.ReactNode;
}

const Sticky: React.FC<StickyProps> = ({ className, top, children }) => {
  const [y, setY] = useState(0);
  const element = useRef<HTMLDivElement | null>(null);
  const [fixed, setFixed] = useState(false);

  const setup = useCallback(() => {
    if (!element.current) return;
    const pos = element.current.getBoundingClientRect();
    setY(pos.top + getScrollTop());
  }, []);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextFixed = scrollTop + 112 > y;
    if (fixed !== nextFixed) {
      setFixed(nextFixed);
    }
  }, [fixed, y]);

  useEffect(() => {
    setup();
  }, [setup]);

  // register scroll event
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div
      ref={element}
      className={className}
      style={{
        position: fixed ? 'fixed' : undefined,
        top: fixed ? top : undefined,
      }}>
      {children}
    </div>
  );
};

export default Sticky;
