import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { loginMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';
import { SigninMutation } from '../../../types/apolloComponent';

export default function useLogin() {
  const [inputs, handleChange] = useForm({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [login, { error: loginError }] = useMutation<SigninMutation>(loginMutation, {
    onCompleted({}) {
      router.push('/');
    },
  });

  return { inputs, handleChange, login, loginError };
}
