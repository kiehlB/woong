import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Comments } from '../../../lib/graphql/comment';

export default function useGetComments() {
  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentstData,
  } = useQuery(GET_Comments);

  return {
    commentsLoading,
    commentsError,
    commentstData,
  };
}
