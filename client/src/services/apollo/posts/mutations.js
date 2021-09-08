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
      title
      excerpt
      previewUrl
      commentCount
      likeCount
      likedBy {
        id
      }
      author {
        id
        username
        certification
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      excerpt
      previewUrl
      commentCount
      likeCount
      likedBy {
        id
      }
      author {
        id
        username
        certification
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
