import type { ChangeEventHandler } from 'react';
import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import '@reach/checkbox/styles.css';
import clsx from 'clsx';
import { MixedCheckbox, useMixedCheckbox } from '@reach/checkbox';

export type TagItemProps = {
  tag: string;
  selected: boolean;
  onClick?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

function TagItem({ tag, selected, onClick, disabled }: TagItemProps) {
  return (
    <div>
      <div>{tag}</div>
    </div>
  );
}

export default TagItem;
