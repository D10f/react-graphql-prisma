const { gql } = require('apollo-server');

const GET_COMMENTS = gql`
  query getPosts($query: String) {
    posts(query: $query) {
      id
      title
      body
      published
    }
  }
`;

module.exports = {
  GET_COMMENTS
};
