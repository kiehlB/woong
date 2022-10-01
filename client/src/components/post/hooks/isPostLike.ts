import { useQuery, gql, useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { GET_Post, IsPost_Like, Post_Like } from '../../../lib/graphql/post';

export default function useIsPostLike() {
  const router = useRouter();

  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(IsPost_Like, {
    variables: { input: { id: parseInt(router.query.id as any) } },
  });

  console.log(dataGetPost);

  return { dataGetPost };
}
