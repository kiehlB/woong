import { useMutation, useQuery } from '@apollo/client';

import { useState } from 'react';
import { Create_Post } from '../../../lib/graphql/post';

export default function useEditor() {
  const [createPost] = useMutation(Create_Post);
  const [inputs, setInputs] = useState('');

  return {
    createPost,
  };
}
