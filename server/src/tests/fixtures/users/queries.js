const { gql } = require('apollo-server');

const GET_USERS = gql`
  query getUsers($query: String) {
    users(query: $query) {
      id
      username
      email
      password
    }
  }
`;

const GET_POSTS = gql`
  query {
    users {
      posts {
        id
        title
        likeCount
      }
    }
  }
`;

const GET_PROFILE = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      username
      url
      certification
      createdAt
    }
  }
`;

const GET_NOTIFICATIONS = gql`
  query getUserNotifications($id: ID!) {
    getUserNotifications(id: $id) {
      id
      message
      postId
      commentId
      emitterId
    }
  }
`;

module.exports = {
  GET_USERS,
  GET_POSTS,
  GET_PROFILE,
  GET_NOTIFICATIONS,
};
