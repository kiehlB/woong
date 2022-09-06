import { ChangeEventHandler, useState } from 'react';
import '@reach/checkbox/styles.css';
import clsx from 'clsx';
import AddTag from '../../static/svg/addtag';

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
  console.log(size);
  return (
    <label>
      <div
        className={clsx(
          'flex items-center text-sm px-4 py-1 border-[#2b2f36] border rounded-full cursor-pointer',
          {
            'border border-[rgba(2,192,118,0.2)]': variant == 'green',
            'border border-[rgba(240,185,11,0.2)] bg-[rgba(240,185,11,0.2)]':
              variant == 'yello',
            'border border-[rgba(217,48,78,0.2)]': variant == 'red',

            'px-2 py-0 text-[#474D57] h-[1.75rem] rounded-lg text-xs font-Roboto ':
              size == 'small',

            'mb-2 mr-2 text-xs h-[22px] px-3 py-1 font-Roboto bg-[#F5F5F5] opacity-60 text-[#14151A] flex justify-center item-center border-none':
              size == 'superSmall',
          },
        )}>
        {children}
        {tag}
        <AddTag className="ml-1 w-[12px] text-[#76808F]" />
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
