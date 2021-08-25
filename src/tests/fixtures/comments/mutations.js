const { gql } = require('apollo-server');

const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      text
      post {
        id
        commentCount
      }
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
      text
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      text
      post {
        id
        commentCount
      }
    }
  }
`;
module.exports = {
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
};
