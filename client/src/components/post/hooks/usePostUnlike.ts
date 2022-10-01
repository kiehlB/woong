import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Post, Post_unLike } from '../../../lib/graphql/post';

export default function usePostUnLike() {
  const router = useRouter();

  const [UnpostLike, { error }] = useMutation(Post_unLike);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Post, {
    variables: { input: { id: parseInt(router.query.id as any) } },
  });

  const isUnLikeBoolean = dataGetPost?.findSinglePost.liked;

  const UnlikehandleSubmit = async () => {
    UnpostLike({
      variables: { input: { id: parseInt(router.query.id as any) } },
      update: (proxy, { data: UnpostLike }) => {
        const data = proxy.readQuery({
          query: GET_Post,
          variables: { input: { id: parseInt(router.query.id as any) } },
        });

        proxy.writeQuery({
          query: GET_Post,
          variables: { input: { id: parseInt(router.query.id as any) } },
          data: {
            ...(data as any),
            post: [UnpostLike.unLikePost, data],
          },
        });
      },
    });
  };

  return { UnlikehandleSubmit, isUnLikeBoolean };
}
