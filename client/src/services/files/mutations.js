import { gql } from '@apollo/client';

export const POST_UPLOAD_FILE = gql`
  mutation postFileUpload($id: ID!, $file: Upload!) {
    postFileUpload(id: $id, file: $file) {
      url
      previewUrl
    }
  }
`;
