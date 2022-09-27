import clsx from 'clsx';

export type DotProps = {
  css: string;
};

function Dot({ css }: DotProps) {
  return (
    <div
      className={clsx(`rounded-[50%] w-2 h-2 mr-2`, {
        'bg-[#02C076]': css == 'Beginner',
        'bg-[#F0B90B]': css == 'Intermediate',
        'bg-[#D9304E]': css == 'Advanced',
      })}
    />
  );
}

export default Dot;
