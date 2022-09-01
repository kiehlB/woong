import clsx from 'clsx';
import { capitalizeFirstLetter } from '../../lib/utils';
import { Button } from '../common/Button';

export type HeaderTopicItemProps = {
  id?: number;
  name?: string;
  svg?: React.ReactNode;
  size: string;
};

function HeaderTopicItem({ name, size }: HeaderTopicItemProps) {
  return (
    <div className="mr-2 mt-2">
      <div
        className={clsx(
          'flex justify-center w-32 bg-black text-white  rounded-3xl  font-Roboto text-sm',
          {
            'space-x-1 px-1 py-1 w-16': size == 'small',
            'space-x-1 px-1 py-1 w-32': size == 'big',
          },
        )}>
        {capitalizeFirstLetter(name)}
      </div>
    </div>
  );
}

export default HeaderTopicItem;
