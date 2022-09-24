import Swing from '../../static/svg/swing';
import { Button } from './Button';

export type SvgCardProps = {
  svg: React.ReactNode;
  title: string;
  subtitle: string;
  bg: string;
  text: string;
};

function SvgCard({ svg, title, subtitle, bg, text }: SvgCardProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-8 items-center py-4 rounded-2xl bg-[${bg}] text-[${text}]`}>
      <div className="col-span-1 py-8 pl-[2.5rem] ">
        <div className={`font-medium font-Roboto leading-10 text-[2.5rem]`}>{title}</div>
        <div className="text-[1.25rem] leading-7 mt-4 ">{subtitle}</div>
        <Button size="medium" variant="secondary" className="mt-10">
          See More
        </Button>
      </div>
      <div className="col-span-1 z-10 ">{svg}</div>
    </div>
  );
}

export default SvgCard;
