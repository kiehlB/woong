import { getTagsSuccess, tagGet } from '../../store/tag';
import Link from 'next/link';

export type HeaderMenuItemsProps = {
  id?: number;
  name?: string;
  subName: string;
  svg?: React.ReactNode;
  dispatch: any;
};

function HeaderMenuItems({ name, svg, subName, dispatch }: HeaderMenuItemsProps) {
  return (
    <Link href="/filter">
      <div
        className="p-4 hover:bg-[#FAFAFA] rounded-lg"
        onClick={() => dispatch(tagGet(name))}>
        <div className="flex items-center">
          <div className="bg-[#FAFAFA] p-2 mr-4 rounded-lg">{svg}</div>
          <div className="flex flex-col ">
            <div className="text-[0.875rem] leading-5  text-[#1E2329] font-Roboto font-medium">
              {name}
            </div>
            <div className="text-[0.7rem] truncate w-52 text-[#707A8A] leading-5 font-normal  font-Roboto   ">
              {subName}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeaderMenuItems;
