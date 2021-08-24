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

module.exports = {
  GET_USERS,
  GET_POSTS
};
