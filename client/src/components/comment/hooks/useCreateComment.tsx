import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { useState } from 'react';
import {
  Create_Comment,
  GET_Comments,
  GET_CommentsById,
} from '../../../lib/graphql/comment';

export default function useCreateComment() {
  const [getText, setText] = useState('');
  const [getSubText, setSubText] = useState('');
  const [isOpen, setIsopen] = useState('');
  const router = useRouter();

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
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
        });

        proxy.writeQuery({
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
          data: {
            ...(data as any),
            getCommentsById: [
              createComment.createComment,
              ...(data as any).getCommentsById,
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
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
        });

        const findData = (data as any).getCommentsById.filter(el => el.id == isOpen);

        proxy.writeQuery({
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
          data: {
            ...(data as any),
            getCommentsById: [createComment.createComment, findData[0]],
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
