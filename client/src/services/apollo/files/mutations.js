import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation singleFileUpload($id: ID!, $file: Upload!) {
    singleFileUpload(id: $id, file: $file) {
      url
      previewUrl
    }
  }
`;
