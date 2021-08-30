import { gql } from '@apollo/client';

export const GET_PUBLIC_POSTS = gql`
  query postsForPublicFeed($limit: Int, $skip: Int) {
    postsForPublicFeed(limit: $limit, skip: $skip) {
      id
      title
      body
      createdAt
      commentCount
      likeCount
      author {
        id
        username
      }
    }
  }
`;

export const GET_FAVORITE_POSTS = gql`
  query postsForFavoriteFeed($limit: Int, $skip: Int) {
    postsForFavoriteFeed(limit: $limit, skip: $skip) {
      id
      title
      body
      createdAt
      commentCount
      likeCount
      author {
        id
        username
      }
    }
  }
`;
