import { ChangeEventHandler, useState } from 'react';
import '@reach/checkbox/styles.css';
import clsx from 'clsx';
import AddTag from '../../static/svg/addtag';

export type TagItemProps = {
  tag?: string;
  disabled?: boolean;
  handleCheck?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  variant?: string;
  children?: React.ReactNode;
  size?: string;
  add?: boolean;
  bg?: string;
  globalTag?: string[];
};

function TagItem({
  tag,
  variant,
  disabled,
  checked,
  handleCheck,

  children,
  size,
  add,
  bg,
}: TagItemProps) {
  return (
    <label>
      <div
        className={clsx(
          'flex items-center  text-sm px-4 py-1 border-[#2b2f36] border rounded-full cursor-pointer',
          {
            'border border-[rgba(2,192,118,0.2)]': variant == 'Beginner',
            'border border-[rgba(240,185,11,0.2)]  ': variant == 'Intermediate',
            'border border-[rgba(217,48,78,0.2)]': variant == 'Advanced',

            'bg-[#F0B90B] text-[#14151A]': bg == 'smallYello' && checked == true,

            '!text-rose-700': bg == 'superSmall' && checked == true,

            'bg-[rgba(2,192,118,0.2)] border-none !text-white':
              bg == 'green' && checked == true,

            'bg-[#f0b90b33] border-none !text-white': bg == 'yello' && checked == true,

            'bg-[#d9304e33] border-none !text-white': bg == 'red' && checked == true,

            'px-4 py-1 border-[#2b2f36] h-[1.75rem] rounded-[100px] text-xs font-Roboto ':
              size == 'small',

            'px-2 py-0 leading-normal border-[#2b2f36] h-[1.75rem] rounded-lg text-xs font-Roboto text-[#AEB4BC]':
              size == 'medium',

            'mb-2 mr-2 text-xs h-[22px] px-3 py-1 font-Roboto bg-[#F5F5F5] opacity-60 text-[#14151A] flex justify-center item-center border-none':
              size == 'superSmall',
          },
        )}>
        <div> {children}</div>
        <div> {tag}</div>

        {add ? (
          checked ? (
            <svg
              className={clsx('w-[12px]', {
                'ml-1': size == 'superSmall',
                'ml-2': size == 'medium',
              })}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor">
              <path d="M20.5 7.42L9.41 18.5L8 17.09L3 12.09L4.41 10.67L9.41 15.67L19.08 6L20.5 7.42Z"></path>
            </svg>
          ) : (
            <AddTag
              className={clsx('w-[12px] text-[#76808F]', {
                'ml-1': size == 'superSmall',
                'ml-2': size == 'medium',
              })}
            />
          )
        ) : (
          ''
        )}
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
}

export default TagItem;
