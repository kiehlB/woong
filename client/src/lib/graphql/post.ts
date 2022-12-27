import gql from 'graphql-tag';

export const Create_Post = gql`
  mutation CreatePost($input: createPost!) {
    createPost(input: $input) {
      id
      body
    }
  }
`;

export const IsPost_Like = gql`
  query IsPostLike($input: getPost!) {
    isPostLike(input: $input)
  }
`;

export const Remove_Post = gql`
  mutation RemovePost($input: removePost!) {
    removePost(input: $input)
  }
`;

export const Post_Like = gql`
  mutation PostLike($input: postLike!) {
    postLike(input: $input) {
      id
      user_id
    }
  }
`;

export const Post_unLike = gql`
  mutation PostUnLike($input: postLike!) {
    postUnLike(input: $input) {
      id
      user_id
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
      thumbnail
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
      liked
      difficulty
      thumbnail
      created_at
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

export const SEARCH_Posts = gql`
  query GetTextSearchPosts($input: searchPost!) {
    getTextSearchPosts {
      id
      body
      title
      created_at
      difficulty
      thumbnail
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

export const Trend_Posts = gql`
  query GetTrendingPosts {
    getTrendingPosts {
      id
      body
      title
      created_at
      difficulty
      thumbnail
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
