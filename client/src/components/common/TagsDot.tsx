import clsx from 'clsx';

export type DotProps = {
  css: string;
};

function Dot({ css }: DotProps) {
  return <div className={clsx(`rounded-[50%] w-2 h-2 mr-2 ${css}`)} />;
}

export default Dot;
