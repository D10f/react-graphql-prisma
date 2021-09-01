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
