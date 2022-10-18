import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IsTextNull } from '../../lib/utils';
import { Button } from '../common/Button';

export type CommentFormProps = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    findId: React.FormEvent<HTMLFormElement>,
    test: string,
  ) => void;
  getText: string;
  textOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  findId: React.FormEvent<HTMLFormElement>;
  userData: any;
  onClickNotify: (e: any) => void;
  onClickNotifyCheckString: (e: React.FormEvent<HTMLFormElement>) => void;
};

function CommentForm(props: CommentFormProps) {
  const [Text, setText] = useState('');

  const textOnChange = e => {
    setText(e.target.value);
  };

  return (
    <div className="">
      <form
        className=""
        onSubmit={e => {
          props.userData.whoAmI ? e.preventDefault() : props.onClickNotify(e);
          IsTextNull(Text)
            ? props.onClickNotifyCheckString(e)
            : props.handleSubmit(e, props.findId, Text);
          props.userData.whoAmI ? setText('') : '';
        }}>
        <div className="z-10">
          <TextareaAutosize
            rows={4}
            placeholder="댓글을 입력하세요"
            className="border border-[#F1F3F5] min-h-[6.125rem] text-[#212529] leading-relaxed  w-full px-[1.5rem] pt-[1rem] mb-[1.5rem] rounded"
            value={Text}
            onChange={textOnChange}
          />
        </div>
        <div className="flex justify-end">
          <button className="ml-8 cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-regal-sky">
            댓글 작성
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
