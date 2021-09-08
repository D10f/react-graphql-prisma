import { gql } from '@apollo/client';

export const GET_PUBLIC_POSTS = gql`
  query postsForPublicFeed($limit: Int, $skip: Int) {
    postsForPublicFeed(limit: $limit, skip: $skip) {
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
        url
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
      previewUrl
      commentCount
      likeCount
      likedBy {
        id
      }
      author {
        id
        username
        url
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
      previewUrl
      commentCount
      likeCount
      likedBy {
        id
      }
      author {
        id
        username
        url
        certification
      }
    }
  }
`;

export const GET_POST_DETAILS = gql`
  query getPostDetails($id: ID!) {
    getPostDetails(id: $id) {
      createdAt
      title
      body
      excerpt
      url
      allowComments
      published
      commentCount
      author {
        id
        username
        certification
        url
      }
      comments {
        id
        text
        createdAt
        author {
          id
          username
          url
          certification
        }
      }
    }
  }
`;

export const GET_POST_BY_AUTHOR = gql`
query getPostsByAuthor($id: ID!, $limit: Int, $skip: Int) {
  getPostsByAuthor(id: $id, limit: $limit, skip: $skip) {
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
      url
      certification
    }
  }
}`;
