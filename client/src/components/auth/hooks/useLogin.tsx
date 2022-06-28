import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { loginMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';

export default function useLogin() {
  const [inputs, handleChange] = useForm({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [login, { error: loginError }] = useMutation(loginMutation, {
    onCompleted({ login }) {
      router.push('/');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await login({
      variables: { input: inputs },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
      },
    });
  };

  return { inputs, handleChange, login, loginError, handleSubmit };
}
