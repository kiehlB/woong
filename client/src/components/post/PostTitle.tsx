import Link from 'next/link';
import Arrow from '../../static/svg/arrow-icon';

export type PostTitleProps = {
  title: string;
  subtitle: string;
};

function PostTitle({ title, subtitle }: PostTitleProps) {
  return (
    <div className="flex justify-between mb-[3.5rem]">
      <div className="text-[1.25rem]  font-Cabin ">{title}</div>
      <div className="flex  items-center text-[#14151A] bg-[#F5F5F5] text-[0.75rem] font-Cabin px-[8px] font-medium cursor-pointer">
        <Link href="/filter">
          <div className="flex  items-center ">
            {subtitle} <Arrow />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PostTitle;
