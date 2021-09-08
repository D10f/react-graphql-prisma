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

export const GET_NOTIFICATIONS = gql`
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
