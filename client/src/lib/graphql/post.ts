import gql from 'graphql-tag';

export const Create_Post = gql`
  mutation CreatePost($input: craeteArtice!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const GET_Posts = gql`
  query FindAllPost {
    findAllPost {
      body
    }
  }
`;
