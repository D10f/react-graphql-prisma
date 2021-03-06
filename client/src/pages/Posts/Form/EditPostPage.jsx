import { useState } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { postsFeed } from '@services/apollo/cache';
import { makeStyles } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import Toast from '@components/Toast';
import QueryResult from '@components/QueryResult';
import { UPDATE_POST } from '@services/apollo/posts/mutations';
import { UPLOAD_FILE } from '@services/apollo/files/mutations';
import { GET_POST_DETAILS } from '@services/apollo/posts/queries';

import PostForm from './PostForm';

const useStyles = makeStyles(theme => ({
  postImage: {
    textAlign: 'center',
    marginBottom: '2rem'
  }
}));

const EditFormPage = ({ history, match }) => {

  useReactiveVar(postsFeed);

  const classes = useStyles();
  const [ submitError, setSubmitError ] = useState('');

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id }
  });

  const [ updatePost, { loading: submitLoading }] = useMutation(UPDATE_POST, {
    onCompleted: responseData => {
      postsFeed(postsFeed().map(post => {
        return post.id === responseData.updatePost.id ? responseData.updatePost : post;
      }));

      history.push(`/trek/${match.params.id}`);
    },
    onError: err => {
      const msg = err.message === 'User Input Validation Error'
        ? err.graphQLErrors[0].extensions.errors[0].message
        : err.message;
      setSubmitError(msg);
    }
  });

  const [ singleFileUpload ] = useMutation(UPLOAD_FILE, {
    onCompleted: ({ singleFileUpload }) => {
      const { url, previewUrl } = singleFileUpload;

      postsFeed(postsFeed().map(cachedPost => {
        return cachedPost.id === match.params.id ? { ...cachedPost, url, previewUrl } : cachedPost;
      }));
    },
    onError: err => setSubmitError(err.message),
  });

  const onSubmit = responseData => {
    updatePost({ variables: { id: Number(match.params.id), input: responseData }});
  };

  const fileHandleChange = file => singleFileUpload({ variables: { id: match.params.id, file }});

  return (
    <QueryResult error={error} loading={loading}>

      <Container className={classes.postImage}>
        {data?.getPostDetails?.url && (
          <img src={data.getPostDetails.url} alt="Main image accompanying the post" />
        )}
      </Container>

      <PostForm
        onSubmit={onSubmit}
        loading={submitLoading}
        post={data && { ...data?.getPostDetails, id: Number(match.params.id) }}
        fileHandleChange={fileHandleChange}
        fileHandleError={setSubmitError}
      />

      {submitError && (
        <Toast
          message={submitError}
          severity='error'
          onClose={() => setSubmitError('')}
        />
      )}
    </QueryResult>
  );
};

export default EditFormPage;
