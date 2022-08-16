import clsx from 'clsx';

export type DotProps = {
  bg: string;
};

function Dot({ bg }: DotProps) {
  return <div className={clsx('rounded-[50%] w-2 h-2 mr-2', bg)} />;
}

export default Dot;
