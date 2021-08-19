import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id,
      username,
      email,
      password,
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser($username: String!, $password: String!) {
      id,
      username,
      email,
      password,
      token
    }
  }
`;
