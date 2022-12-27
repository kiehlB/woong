import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  GET_Comments,
  GET_CommentsById,
  Remove_Comment,
} from '../../../lib/graphql/comment';

export default function useDeleteComment() {
  const router = useRouter();
  const [deleteComment, { error }] = useMutation(Remove_Comment);
  const DeleteCommentSubmit = async (e, commentId) => {
    e.preventDefault();

    deleteComment({
      variables: {
        input: {
          comment_id: parseInt(commentId),
        },
      },
      update: (proxy, { data: deleteComment }) => {
        const data = proxy.readQuery({
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
        });

        console.log(data);
        console.log(commentId);

        proxy.writeQuery({
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
          data: {
            ...(data as any),
            getCommentsById: [
              ...(data as any).getCommentsById.filter(el => el.id !== commentId),
            ],
          },
        });
      },
    });
  };

  return { DeleteCommentSubmit };
}
