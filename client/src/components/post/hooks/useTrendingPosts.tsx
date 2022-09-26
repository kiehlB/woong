import { useQuery, gql, useMutation } from '@apollo/client';
import { Trend_Posts } from '../../../lib/graphql/post';

export default function useTrendingPosts() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(Trend_Posts);

  return {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  };
}
