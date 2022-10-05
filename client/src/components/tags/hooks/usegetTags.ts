import { useQuery } from '@apollo/client';
import { GET_Tags } from '../../../lib/graphql/tag';

export default function useGetTags() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_Tags);

  return {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  };
}
