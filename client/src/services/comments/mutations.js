import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      text
      author {
        id
        username
        certification
        url
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
