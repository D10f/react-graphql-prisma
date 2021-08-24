const { gql } = require('apollo-server');

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      email
      password
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      username
      email
      password
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($targetUserId: ID!, $input: UpdateUserInput!) {
    updateUser(targetUserId: $targetUserId, input: $input) {
      id
      username
      email
      password
      token
    }
  }
`;

module.exports = {
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER
};
