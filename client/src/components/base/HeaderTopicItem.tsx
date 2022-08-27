import { capitalizeFirstLetter } from '../../lib/utils';
import { Button } from '../common/Button';

export type HeaderTopicItemProps = {
  id?: number;
  name?: string;
  svg?: React.ReactNode;
};

function HeaderTopicItem({ name }: HeaderTopicItemProps) {
  return (
    <div className="mr-2">
      <div className="flex justify-center w-32 bg-black text-white  rounded-3xl  font-Roboto   space-x-1 px-3 py-1 text-sm">
        {capitalizeFirstLetter(name)}
      </div>
    </div>
  );
}

export default HeaderTopicItem;
