import * as React from 'react';
import clsx from 'clsx';

interface GridProps {
  children: React.ReactNode;
  overflow?: boolean;
  className?: string;
  as?: React.ElementType;
  nested?: boolean;
  rowGap?: boolean;
  featured?: boolean;
}

const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
  { children, className, as: Tag = 'div', featured, nested, rowGap },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={clsx('relative', {
        '': !nested,
        'w-full': nested,
        'py-10 md:py-24 lg:pb-40 lg:pt-36': featured,
      })}>
      {featured ? (
        <div className="absolute inset-0 -mx-5vw">
          <div className="bg-secondary mx-auto h-full w-full max-w-8xl rounded-lg" />
        </div>
      ) : null}

      <div
        className={clsx(
          'relative grid grid-cols-2 gap-x-4 mmd:grid-cols-1',
          {
            '': !nested,
            'gap-y-4 lg:gap-y-6': rowGap,
          },
          className,
        )}>
        {children}
      </div>
    </Tag>
  );
});

function GridLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      <Grid>
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="flex h-screen items-start bg-black text-black opacity-10 dark:bg-white dark:text-white">
            <div className="w-full pt-4 text-center text-lg text-black dark:text-white">
              {idx + 1}
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export { Grid, GridLines };
