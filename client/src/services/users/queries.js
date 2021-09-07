import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      username
      url
      certification
      createdAt
    }
  }
`;
