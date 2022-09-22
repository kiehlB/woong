import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { inputProps } from '../../../components/auth/AuthForm';
import { registerMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';
import { RegisterMutation } from '../../../types/apolloComponent';

export default function useRegister() {
  const router = useRouter();
  const [inputs, handleChange] = useForm({
    email: '',
    password: '',
  } as inputProps);

  const [signUp, { error: registerError }] = useMutation<RegisterMutation>(
    registerMutation,
    {
      onCompleted() {
        router.push('/');
      },
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({
      variables: { input: inputs },
    });
  };

  return { inputs, handleChange, handleSubmit, registerError };
}
