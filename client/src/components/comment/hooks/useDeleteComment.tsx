import { useMutation } from '@apollo/client';

import { useState } from 'react';
import { GET_Comments, Remove_Comment } from '../../../lib/graphql/comment';

export default function useDeleteComment() {
  const [deleteComment, { error }] = useMutation(Remove_Comment);
  const DeleteCommentSubmit = async (e, commentId) => {
    e.preventDefault();

    deleteComment({
      variables: {
        id: commentId,
      },
      update: (proxy, { data: deleteComment }) => {
        const data = proxy.readQuery({
          query: GET_Comments,
        });

        const findData = (data as any).comment.find(el => el.id == commentId);
        const findIndex = (data as any).comment.indexOf(findData);

        proxy.writeQuery({
          query: GET_Comments,
          data: {
            ...(data as any),
            comment: [...(data as any).comment.filter(el => el.id !== commentId)],
          },
        });
      },
    });
  };

  return { DeleteCommentSubmit };
}
