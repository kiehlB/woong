import gql from 'graphql-tag';

export const Create_Post = gql`
  mutation CreatePost($input: createPost!) {
    createPost(input: $input) {
      id
      body
    }
  }
`;

export const GET_Posts = gql`
  query FindAllPost {
    findAllPost {
      id
      body
      title
    }
  }
`;
