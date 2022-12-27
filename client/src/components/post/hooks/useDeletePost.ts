import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Posts, Remove_Post } from '../../../lib/graphql/post';

export default function useDeletePost() {
  const router = useRouter();
  const [deletePost] = useMutation(Remove_Post);

  const DeletePostSubmit = async (e, findId) => {
    e.preventDefault();
    deletePost({
      variables: {
        input: {
          post_id: findId,
        },
      },
      update: proxy => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        // console.log(data);
        // proxy.writeQuery({
        //   query: GET_Posts,
        //   data: {
        //     ...(data as any),
        //     posts: [...(data as any).posts?.filter(i => i.id !== findId)],
        //   },
        // });
      },
    });
    // router.push('/');
    window.location.replace('/');
  };

  return { DeletePostSubmit };
}
