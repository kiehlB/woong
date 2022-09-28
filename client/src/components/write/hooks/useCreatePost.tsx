import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Create_Post } from '../../../lib/graphql/post';

export default function useEditor() {
  const router = useRouter();

  const [createPost] = useMutation(Create_Post, {
    onCompleted({}) {
      router.push('/');
    },
  });
  const [inputs, setInputs] = useState('');

  return {
    createPost,
  };
}
