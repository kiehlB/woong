import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { logoutMutation, meQuery, registerMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';
import { WhoAmIQuery } from '../../../types/apolloComponent';
import Router from 'next/router'

export default function useGetUser() {
  const { data: getUser, loading, error } = useQuery<WhoAmIQuery>(meQuery);
  const router = useRouter();
    const [logout, { client }] =  useMutation(logoutMutation);


  const logoutButton = async () => {
    if (!loading && getUser?.whoAmI?.ok) {
      await logout();
      Router.reload();
      
      // await client!.resetStore();
    }
  };

  return {
    loading,
    error,
    getUser,
    logoutButton,
  };
}
