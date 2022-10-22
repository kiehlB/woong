import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { checkEmpty } from '../../lib/utils';
import { Button } from '../common/Button';

export type SubCommentsFormProps = {
  userData: any;
  subHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    findId: string,
    SubText: string,
  ) => Promise<void>;
  findData: any;
  onClickNotify: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: string;
  on: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  onClickNotifyCheckString: (e: React.FormEvent<HTMLFormElement>) => void;
};

function SubCommentsForm(props: SubCommentsFormProps) {
  const [SubText, setSubText] = useState('');

  const subTextOnChange = e => {
    setSubText(e.target.value);
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={e => {
          props.userData.whoAmI ? e.preventDefault() : props.onClickNotify(e);
          checkEmpty(SubText)
            ? props.onClickNotifyCheckString(e)
            : props.subHandleSubmit(e, props.findData.id, SubText);
          props.userData.whoAmI ? setSubText('') : '';
        }}>
        <TextareaAutosize
          rows={4}
          className="border border-[#F1F3F5] min-h-[6.125rem] text-[#212529] leading-relaxed  w-full px-[1.5rem] pt-[1rem] mb-[1.5rem] rounded"
          placeholder="댓글을 입력하세요"
          name="text"
          value={SubText}
          onChange={subTextOnChange}
        />
        <div className="flex justify-end">
          <button className="ml-8 cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-regal-sky">
            댓글 작성
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubCommentsForm;
