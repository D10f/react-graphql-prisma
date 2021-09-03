import { gql } from '@apollo/client';

export const LIKE_POST = gql`
  mutation likeOrUnlikePost($postId: ID!) {
    likeOrUnlikePost(postId: $postId) {
      id
      likeCount
      likedBy {
        id
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
    }
  }
`;
