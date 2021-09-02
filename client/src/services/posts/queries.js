import { gql } from '@apollo/client';

export const GET_PUBLIC_POSTS = gql`
  query postsForPublicFeed($limit: Int, $skip: Int) {
    postsForPublicFeed(limit: $limit, skip: $skip) {
      id
      title
      excerpt
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

export const GET_FAVORITE_POSTS = gql`
  query postsForFavoriteFeed($limit: Int, $skip: Int) {
    postsForFavoriteFeed(limit: $limit, skip: $skip) {
      id
      title
      excerpt
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

export const GET_AUTHOR_POSTS = gql`
  query postsForDashboardFeed($limit: Int, $skip: Int) {
    postsForDashboardFeed(limit: $limit, skip: $skip) {
      id
      title
      excerpt
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

export const GET_POST_DETAILS = gql`
  query getPostDetails($id: ID!) {
    getPostDetails(id: $id) {
      title
      body
      allowComments
      comments {
        id
        text
        author {
          id
          username
          certification
        }
      }
    }
  }
`;
