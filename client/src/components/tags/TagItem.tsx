import { ChangeEventHandler, useState } from 'react';
import '@reach/checkbox/styles.css';
import clsx from 'clsx';

export type TagItemProps = {
  tag?: string;
  disabled?: boolean;
  Toogle: any;
};

function TagItem({ tag, disabled, Toogle }: TagItemProps) {
  return (
    <div className={clsx('')}>
      <div> {tag}</div>
    </div>
  );

  // <div onClick={Toogle(tag)}>
  //   <div className="font-Roboto text-sm">{tag}</div>
  // </div>
}

export default TagItem;
