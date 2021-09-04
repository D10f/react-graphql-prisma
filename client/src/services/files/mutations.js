import { gql } from '@apollo/client';

export const POST_UPLOAD_FILE = gql`
  mutation singlePostUpload($id: ID!, $file: Upload!) {
    singlePostUpload(id: $id, file: $file) {
      url
      previewUrl
    }
  }
`;
