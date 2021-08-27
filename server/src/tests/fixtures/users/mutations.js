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
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      password
      token
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
      email
    }
  }
`;

module.exports = {
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
  DELETE_USER
};
