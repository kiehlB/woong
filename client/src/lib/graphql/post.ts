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
      created_at
      difficulty

      post_likes {
        id
        post_id
        user_id
      }

      posts_tags {
        tag {
          id
          name
          name_filtered
        }
      }
    }
  }
`;

export const GET_Post = gql`
  query FindSinglePost($input: getPost!) {
    findSinglePost(input: $input) {
      id
      body
      title
      difficulty

      post_likes {
        id
        post_id
        user_id
      }

      posts_tags {
        tag {
          id
          name
          name_filtered
        }
      }
    }
  }
`;
