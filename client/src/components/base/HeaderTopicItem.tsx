import clsx from 'clsx';
import { capitalizeFirstLetter } from '../../lib/utils';
import { Button } from '../common/Button';
import Link from 'next/link';
export type HeaderTopicItemProps = {
  id?: number;
  name?: string;
  svg?: React.ReactNode;
  size?: string;
  handleCheck?: any;
};

function HeaderTopicItem({ name, size, handleCheck }: HeaderTopicItemProps) {
  return (
    <Link href="/filter">
      <div className="mr-2 mt-2  ">
        <div
          onClick={() => handleCheck(name)}
          className={clsx(' text-white  rounded-3xl  font-Roboto  text-sm', {
            'truncate  px-[12px] py-[2px] text-xs bg-[#0B0E11] shadow-md max-w-[6rem]':
              size == 'small',
            'pl-4 space-x-1 px-1 py-1 bg-black truncate max-w-[6rem]': size == 'big',
          })}>
          {capitalizeFirstLetter(name)}
        </div>
      </div>
    </Link>
  );
}

export default HeaderTopicItem;
