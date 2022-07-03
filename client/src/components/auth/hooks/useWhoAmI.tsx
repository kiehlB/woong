import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { meQuery, registerMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';

export default function useGetUser() {
  const { data: getUser, loading, error } = useQuery(meQuery);

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
