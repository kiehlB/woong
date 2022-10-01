import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
    <div>
      <form>
        <TextareaAutosize
          rows={4}
          className="commentsInput"
          placeholder="댓글을 입력하세요"
          name="text"
          value={SubText}
          onChange={subTextOnChange}
        />
        <div className="button-flex"></div>
      </form>
    </div>
  );
}

export default SubCommentsForm;
