 
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutMutation } from '../../../lib/graphql/users';
 

export default function useLogout() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [logout, { client }] = useMutation(logoutMutation)

  const logoutButton = async () => {
     
      await logout();

    //   await client.clearStore().then(() => {
    //     client.resetStore();
    //     // dispatch(userLogout());
    //     router.push('/');
    //   });
    
  };

  return {
    
    logoutButton
  };
}