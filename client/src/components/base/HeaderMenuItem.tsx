import { getTagsSuccess, tagGet } from '../../store/tag';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export type HeaderMenuItemsProps = {
  id?: number;
  name?: string;
  subName: string;
  svg?: React.ReactNode;
  handleCheck: any;
};

function HeaderMenuItems({ name, svg, subName, handleCheck }: HeaderMenuItemsProps) {
  const dispatch = useDispatch();

  return (
    <Link href="/filter">
      <a>
        <div
          className="p-4 hover:bg-[#FAFAFA] rounded-lg"
          onClick={() => handleCheck(name)}>
          <div className="flex items-center">
            <div className="bg-[#FAFAFA] p-2 mr-4 rounded-lg">{svg}</div>
            <div className="flex flex-col ">
              <div className="text-[0.875rem] leading-5  text-[#1E2329] font-Roboto font-medium">
                {name}
              </div>
              <div className="text-[0.7rem] truncate w-52 text-[#707A8A] leading-5 font-normal font-Roboto">
                {subName}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default HeaderMenuItems;
