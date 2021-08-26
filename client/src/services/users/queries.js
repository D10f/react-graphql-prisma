import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers($query: String) {
    users(query: $query) {
      id
      username
      email
    }
  }
`;

export const LOGGED_IN_USER = gql`
  query loggedInUser {
    user {
      id
      token
    }
  }
`;
