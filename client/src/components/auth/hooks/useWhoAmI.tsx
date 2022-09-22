import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { meQuery, registerMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';
import { WhoAmIQuery } from '../../../types/apolloComponent';

export default function useGetUser() {
  const { data: getUser, loading, error } = useQuery<WhoAmIQuery>(meQuery);

  //   const [logout, { client }] = useLogoutMutation();

  const logoutButton = async () => {
    // if (!loading && getUser.me) {
    //   await logout();
    //   setAccessToken('');
    //   await client!.resetStore();
    // }
  };

  return {
    loading,
    error,
    getUser,
    logoutButton,
  };
}
