import { ChangeEventHandler, useState } from 'react';
import '@reach/checkbox/styles.css';
import clsx from 'clsx';

export type TagItemProps = {
  tag?: string;
  disabled?: boolean;
  handleCheck?: any;
  checked?: any;
  globalTag?: any;
  variant?;
  children?;
  size?;
};

function TagItem({
  tag,
  variant,
  disabled,
  checked,
  handleCheck,
  globalTag,
  children,
  size,
}: TagItemProps) {
  return (
    <label>
      <div
        className={clsx(
          'flex items-center text-sm px-4 py-1    border-[#2b2f36] border rounded-full cursor-pointer',
          {
            'border border-[rgba(2,192,118,0.2)]': variant == 'green',
            'border border-[rgba(240,185,11,0.2)] bg-[rgba(240,185,11,0.2)]':
              variant == 'yello',
            'border border-[rgba(217,48,78,0.2)]': variant == 'red',

            'px-2 py-0 text-[#474D57] h-[1.75rem] rounded-lg text-xs font-Roboto':
              size == 'small',
          },
        )}>
        {children}
        {tag}
      </div>
      <input
        value={tag}
        type="checkbox"
        onChange={handleCheck}
        checked={checked}
        className="hidden"
      />
    </label>
  );

  // <div onClick={Toogle(tag)}>
  //   <div className="font-Roboto text-sm">{tag}</div>
  // </div>
}

export default TagItem;

//text-[#aeb4bc]
