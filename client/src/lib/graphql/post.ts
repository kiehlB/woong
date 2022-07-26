import gql from 'graphql-tag';

export const Create_Post = gql`
  mutation CreatePost($input: createPost!) {
    createPost(input: $input) {
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
