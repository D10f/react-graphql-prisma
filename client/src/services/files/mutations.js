import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation fileUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;
