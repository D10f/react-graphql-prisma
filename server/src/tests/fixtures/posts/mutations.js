const { gql } = require('apollo-server');

const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
      published
      allowComments
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      title
      body
      published
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
      body
      published
    }
  }
`;

const LIKE_OR_UNLIKE_POST = gql`
  mutation likeOrUnlikePost($postId: ID!) {
    likeOrUnlikePost(postId: $postId) {
      likeCount
      likedBy {
        id
        username
        likes {
          id
          title
        }
      }
    }
  }
`;

module.exports = {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_OR_UNLIKE_POST,
};
