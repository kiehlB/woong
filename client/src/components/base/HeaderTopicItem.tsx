import { capitalizeFirstLetter } from '../../lib/utils';
import { Button } from '../common/Button';

export type HeaderTopicItemProps = {
  id?: number;
  name?: string;
  svg?: React.ReactNode;
};

function HeaderTopicItem({ name }: HeaderTopicItemProps) {
  return (
    <div className="py-0.5 mr-2 mb-1 ">
      <Button
        size="small"
        className="w-32 bg-black text-white  rounded-3xl  font-Roboto text-[0.75rem]">
        {capitalizeFirstLetter(name)}
      </Button>
    </div>
  );
}

export default HeaderTopicItem;
