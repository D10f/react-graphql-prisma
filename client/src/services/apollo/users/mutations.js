import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      username
      token
      certification
      role
      url
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      token
      certification
      role
      url
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logoutUser($id: ID!) {
    logoutUser(id: $id) {
      id
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      id
    }
  }
`;
