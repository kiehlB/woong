import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation Signin($input: InputSignin!) {
    signin(input: $input) {
      token
    }
  }
`;

export const registerMutation = gql`
  mutation Register($input: registerInput!) {
    register(input: $input) {
      id
    }
  }
`;

export const getUsersQuery = gql`
  query Users {
    users {
      id
      username
      follower {
        id
        follower_id
      }
    }
  }
`;

export const meQuery = gql`
  query WhoAmI {
    whoAmI {
      error
      ok
      user {
        id
      }
    }
  }
`;

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;

export const followMutation = gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username) {
      id
      user_id
      follower_id
    }
  }
`;

export const unFollowMutation = gql`
  mutation UnFollowUser($username: String!) {
    unFollowUser(username: $username) {
      id
    }
  }
`;
