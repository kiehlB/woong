import { useMutation } from '@apollo/client';

import { useState } from 'react';
import { Create_Comment, GET_Comments } from '../../../lib/graphql/comment';

export default function useCreateComment() {
  const [getText, setText] = useState('');
  const [getSubText, setSubText] = useState('');
  const [isOpen, setIsopen] = useState('');

  const textOnChange = e => {
    setText(e.target.value);
  };

  const subTextOnChange = e => {
    setSubText(e.target.value);
  };

  const [createComment] = useMutation(Create_Comment, {
    onCompleted({ createComment }) {},
  });

  const handleSubmit = async (e, findId, Text) => {
    e.preventDefault();

    createComment({
      variables: {
        input: { post_id: findId, text: Text },
      },

      update: (proxy, { data: createComment }) => {
        const data = proxy.readQuery({
          query: GET_Comments,
        });

        proxy.writeQuery({
          query: GET_Comments,
          data: {
            ...(data as any),
            findAllComments: [
              createComment.createComment,
              ...(data as any).findAllComments,
            ],
          },
        });
      },
    });
  };

  const subHandleSubmit = async (e, findId, subText) => {
    e.preventDefault();

    createComment({
      variables: {
        input: { post_id: parseInt(findId), text: subText, comment_id: parseInt(isOpen) },
      },

      update: async (proxy, { data: createComment }) => {
        const data = proxy.readQuery({
          query: GET_Comments,
        });

        const findData = (data as any).findAllComments.filter(el => el.id == isOpen);

        proxy.writeQuery({
          query: GET_Comments,
          data: {
            ...(data as any),
            findAllComments: [createComment.createComment, findData[0]],
          },
        });
      },
    });
  };

  return {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  };
}
