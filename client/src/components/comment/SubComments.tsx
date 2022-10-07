import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type SubCommentsProps = {
  ele: any;
  el: any;
  subEditText: string;
  editSubCommentInput: (e: any) => void;
  EditCommentSubmit: (e: any, commentId: string, text: string) => Promise<void>;
  DeleteCommentSubmit: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: string,
  ) => Promise<void>;
  userData: any;
  findData: any;
  onClickNotifyCheckString: (e: any) => void;
};

function SubComments(props: SubCommentsProps) {
  const [editSubComment, setEditSubComment] = useState(false);
  const [subEditText, subSetEditText] = useState('');

  const editSubCommentInput = e => {
    subSetEditText(e.target.value);
  };

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
    subSetEditText(props.ele.text);
  };

  console.log(props.ele);
  return (
    <>
      <div>
        {props.ele.reply && props.el.id == props.ele.reply ? (
          <div className="subcomments-wrapper ">
            <div>
              <div className="flex mt-4  ml-4">
                <img
                  src="https://secure.gravatar.com/avatar/ceb84f6559c4206c1a588e0e31c0a048?s=22&d=mm&r=g"
                  style={{ borderRadius: '50%', marginRight: '.5rem' }}
                />
                {props.el.user?.username}
                <div className="color-base-30 px-2 m:pl-0" role="presentation">
                  •
                </div>
              </div>
              {editSubComment ? (
                <div>
                  <form>
                    <div className=" pt-4">
                      <TextareaAutosize
                        rows={4}
                        name="text"
                        value={subEditText}
                        className="w-full   px-4"
                        onChange={editSubCommentInput}
                      />
                    </div>
                  </form>
                  <div className="comments-edit-wrapper">
                    <div className="sub-color" style={{ paddingBottom: '.5rem' }}>
                      수정
                    </div>
                    <div className="sub-color" onClick={fixSubComment}>
                      취소
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <div className="ml-4" style={{ whiteSpace: 'pre-line' }}>
                    {props.ele.text}
                  </div>
                  {props.userData?.whoAmI?.id == props.ele.user.id ? (
                    <div className="comments-edit-wrapper">
                      <div onClick={fixSubComment} className="sub-color">
                        수정
                      </div>
                      <div
                        className="sub-color"
                        onClick={e => props.DeleteCommentSubmit(e, props.ele.id)}>
                        삭제
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default SubComments;
