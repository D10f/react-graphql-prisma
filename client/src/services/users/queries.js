import { gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core';


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
