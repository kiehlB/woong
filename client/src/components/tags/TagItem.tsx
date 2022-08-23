import { ChangeEventHandler, useState } from 'react';
import '@reach/checkbox/styles.css';

import { Button } from '../common/Button';

export type TagItemProps = {
  tag: string;
  disabled?: boolean;
};

function TagItem({ tag, disabled }: TagItemProps) {
  const [clickedTag, setClickedTag] = useState(false);

  return (
    <div>
      <Button
        size="small"
        variant="secondary"
        className="font-Roboto text-sm"
        selected={clickedTag}
        setClick={setClickedTag}>
        {tag}
      </Button>
    </div>
  );
}

export default TagItem;
