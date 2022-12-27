import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import TextareaAutosize from 'react-textarea-autosize';
import { checkEmpty } from '../../lib/utils';

export type CommentsProps = {
  el?: any;
  editComment?: boolean;
  editText?: string;
  editCommentInput?: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsopen?: React.Dispatch<React.SetStateAction<string>>;
  toggle?: React.Dispatch<React.SetStateAction<boolean>>;
  on?: boolean;
  EditCommentSubmit?: (e: any, commentId: string, text: string) => Promise<void>;
  fixComment?: () => void;
  DeleteCommentSubmit?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: string,
  ) => Promise<void>;
  userData?: any;
  onClickNotifyCheckString: (e: React.FormEvent<HTMLFormElement>) => void;
};

function Comments(props: CommentsProps) {
  const [editComment, setEditComment] = useState(false);
  const [editSubComment, setEditSubComment] = useState(false);
  const [editText, setEditText] = useState('');

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const fixComment = () => {
    setEditComment(!editComment);
    setEditText(props.el.text);
  };

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
  };

  return (
    <>
      <div className="mt-8">
        {props.el.reply ? (
          ''
        ) : (
          <div>
            <div className="border  border-[#F1F3F5] p-[0.75rem]">
              <div className="flex items-center mb-2">
                <img
                  src="https://secure.gravatar.com/avatar/ceb84f6559c4206c1a588e0e31c0a048?s=22&d=mm&r=g"
                  style={{ borderRadius: '50%', marginRight: '.5rem' }}
                />
                <div>{props.el.user?.email}</div>
                {props.userData?.whoAmI?.user?.id == props.el.user.id ? (
                  <div className="flex ml-auto">
                    {editComment ? (
                      <>
                        <div
                          className="z-10"
                          onClick={e => {
                            checkEmpty(editText)
                              ? props.onClickNotifyCheckString(e as any)
                              : props.EditCommentSubmit(e, props.el.id, editText);
                            checkEmpty(editText) ? e.preventDefault() : fixComment();
                          }}>
                          수정
                        </div>
                        <div onClick={fixComment} className="z-10">
                          취소
                        </div>
                      </>
                    ) : (
                      <div className="flex">
                        <div onClick={fixComment} className="z-10 pr-2">
                          수정
                        </div>
                        <div
                          className="z-10"
                          onClick={e => props.DeleteCommentSubmit(e, props.el.id)}>
                          삭제
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="comments-text z-10 mb-2 py-1">
                {editComment ? (
                  <form>
                    <TextareaAutosize
                      className="w-full z-10"
                      rows={4}
                      name="text"
                      value={editText}
                      onChange={editCommentInput}
                    />
                  </form>
                ) : (
                  props.el.text
                )}
              </div>

              <div className="flex">
                <div className="flex items-center">
                  <IoIosAddCircleOutline
                    style={{ marginRight: '.2rem' }}
                    onClick={() => {
                      props.setIsopen(props.el.id);
                      props.toggle(!props.on);
                    }}
                  />
                  <div
                    onClick={() => {
                      props.setIsopen(props.el.id);
                      props.toggle(!props.on);
                    }}>
                    댓글 작성
                  </div>
                </div>
              </div>
            </div>
            {props.el.has_replies ? <RiArrowDropDownLine /> : ''}
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
