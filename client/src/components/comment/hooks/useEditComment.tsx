import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import {
  Edit_Comment,
  GET_Comments,
  GET_CommentsById,
} from '../../../lib/graphql/comment';

export default function useEditComment() {
  const router = useRouter();

  const [editComment, { error }] = useMutation(Edit_Comment);
  const EditCommentSubmit = async (e, commentId, text) => {
    e.preventDefault();

    editComment({
      variables: {
        input: {
          comment_id: parseInt(commentId),
          text: text,
        },
      },

      update: (proxy, { data: editComment }) => {
        const data = proxy.readQuery({
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
        });

        const findData = (data as any).getCommentsById?.find(
          el => el.id == parseInt(commentId),
        );

        proxy.writeQuery({
          query: GET_CommentsById,
          variables: { input: { post_id: parseInt(router.query.id as any) } },
          data: {
            ...(data as any),
            comment: [findData == editComment.editComment],
          },
        });
      },
    });
  };

  return { EditCommentSubmit };
}
