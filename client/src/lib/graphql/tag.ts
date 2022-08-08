import gql from 'graphql-tag';

export const GET_Tags = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      name_filtered
      updated_at
    }
  }
`;
