import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_CommentsById } from '../../../lib/graphql/comment';
import { GET_Post } from '../../../lib/graphql/post';

export default function useGetCommentsById() {
  const router = useRouter();

  const {
    loading: getcommentByIdLoding,
    error: getcommentByIdError,
    data: getcommentByIdData,
  } = useQuery(GET_CommentsById, {
    variables: { input: { post_id: parseInt(router.query.id as any) } },
  });

  return {
    getcommentByIdLoding,
    getcommentByIdError,
    getcommentByIdData,
  };
}
