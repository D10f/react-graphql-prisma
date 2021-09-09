const { gql } = require('apollo-server');

const GET_POSTS = gql`
  query getPosts($query: String) {
    posts(query: $query) {
      id
      title
      body
      published
    }
  }
`;

const GET_FAVORITE_POSTS = gql`
  query postsForFavoriteFeed($limit: Int, $skip: Int) {
    postsForFavoriteFeed(limit: $limit, skip: $skip) {
      id
      title
      excerpt
    }
  }
`;

const GET_AUTHOR_POSTS = gql`
  query postsForDashboardFeed($limit: Int, $skip: Int) {
    postsForDashboardFeed(limit: $limit, skip: $skip) {
      id
      title
      excerpt
    }
  }
`;

module.exports = {
  GET_POSTS,
  GET_FAVORITE_POSTS,
  GET_AUTHOR_POSTS
};
