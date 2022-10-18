import { useQuery, gql, useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { GET_Post, Post_Like } from '../../../lib/graphql/post';

export default function usePostLike() {
  const router = useRouter();

  const [postLike, { error }] = useMutation(Post_Like);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Post, {
    variables: { input: { id: parseInt(router.query.id as any) } },
  });

  const isLikeBoolean = dataGetPost?.findSinglePost.liked;

  const LikehandleSubmit = async () => {
    const response = await postLike({
      variables: { input: { id: parseInt(router.query.id as any) } },
      update: (proxy, { data: postLike }) => {
        const data = proxy.readQuery({
          query: GET_Post,
          variables: { input: { id: parseInt(router.query.id as any) } },
        });

        console.log(postLike);
        proxy.writeQuery({
          query: GET_Post,
          variables: { input: { id: parseInt(router.query.id as any) } },
          data: {
            ...(data as any),
            findSinglePost: {
              post_likes: [postLike, ...(data as any)?.findSinglePost.post_likes],
            },
          },
        });
      },
    });
  };

  return { LikehandleSubmit, isLikeBoolean };
}
