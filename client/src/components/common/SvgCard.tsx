import Swing from '../../static/svg/swing';
import { Button } from './Button';

export type SvgCardProps = {
  svg: React.ReactNode;
};

function SvgCard({ svg }: SvgCardProps) {
  return (
    <div className="grid grid-cols-2 gap-8 bg-[#FAFAFA] items-center py-4 rounded-2xl ">
      <div className="col-span-1 py-8 pl-[2.5rem] ">
        <div className="font-medium font-Roboto leading-10 text-[2.5rem]">
          Earn crypto by learning about blockchain
        </div>
        <div className="text-[1.25rem] leading-7 mt-4 ">
          Build your blockchain knowledge, complete quizzes, and earn free crypto.
        </div>
        <Button size="medium" variant="secondary" className="mt-10">
          Get Start
        </Button>
      </div>
      <div className="col-span-1 z-10 ">{svg}</div>
    </div>
  );
}

export default SvgCard;
