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

  console.log(props.userData.whoAmI);
  return (
    <div>
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
          className="commentsInput"
          placeholder="댓글을 입력하세요"
          name="text"
          value={SubText}
          onChange={subTextOnChange}
        />
        <div className="button-flex">
          <Button className=" text-white bg-regal-sky">댓글 작성</Button>
        </div>
      </form>
    </div>
  );
}

export default SubCommentsForm;
