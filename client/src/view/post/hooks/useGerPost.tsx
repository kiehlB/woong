import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Post } from '../../../lib/graphql/post';

export default function useGetPost() {
  const router = useRouter();
  const {
    loading: singlePostLoding,
    error: singlePostError,
    data: singlePostData,
  } = useQuery(GET_Post, {
    variables: { input: { id: parseInt(router.query.id as any) } },
  });

  console.log(singlePostData);
  return {
    singlePostLoding,
    singlePostError,
    singlePostData,
  };
}
