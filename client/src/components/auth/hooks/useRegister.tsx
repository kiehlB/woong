import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { registerMutation } from '../../../lib/graphql/users';
import useForm from '../../../lib/hooks/useForm';

export default function useRegister() {
  const router = useRouter();
  const [inputs, handleChange] = useForm({
    email: '',
    password: '',
  });

  const [signUp, { error: registerError }] = useMutation(registerMutation, {
    onCompleted({ signUp }) {
      router.push('/');
    },
  });

  const handleSubmit = async e => {
    console.log(inputs);
    e.preventDefault();
    signUp({
      variables: { input: inputs },
    });
  };

  return { inputs, handleChange, handleSubmit, registerError };
}
