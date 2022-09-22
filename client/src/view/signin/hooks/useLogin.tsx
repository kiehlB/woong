import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
