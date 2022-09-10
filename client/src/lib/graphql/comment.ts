import gql from 'graphql-tag';

export const GET_Comments = gql`
  query FindAllComments {
    findAllComments {
      created_at
      id
      post_id
      reply
      deleted
      text
      user_id
    }
  }
`;

export const Create_Comment = gql`
  mutation CreateComment($input: createComment) {
    createComment(input: $input) {
      id
      text
    }
  }
`;

export const Edit_Comment = gql`
  mutation EditComment($input: editComment) {
    editComment(input: $input) {
      id
      text
    }
  }
`;

export const Remove_Comment = gql`
  mutation RemoveComment($id: Int!) {
    removeComment(id: $id)
  }
`;