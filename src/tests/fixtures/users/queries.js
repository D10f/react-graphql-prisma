const { gql } = require('apollo-server');

const GET_ALL_USERS = gql`
  query {
    users {
      id
      username
      email
      password
    }
  }
`;

const GET_ALL_POSTS = gql`
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

module.exports = {
  GET_ALL_USERS,
  GET_ALL_POSTS
};
