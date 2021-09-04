import { useState } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { postsFeed } from '@services/apollo/cache';
import { makeStyles } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import Toast from '@components/Toast';
import QueryResult from '@components/QueryResult';
import { UPDATE_POST } from '@services/posts/mutations';
import { POST_UPLOAD_FILE } from '@services/files/mutations';
import { GET_POST_DETAILS } from '@services/posts/queries';

import PostForm from './PostForm';

const useStyles = makeStyles(theme => ({
  postImage: {
    textAlign: 'center',
    marginBottom: '2rem'
  }
}));

const EditFormPage = ({ history, match }) => {

  const classes = useStyles();
  const [ submitError, setSubmitError ] = useState('');
  const postsInCache = useReactiveVar(postsFeed);

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id }
  });

  const [ updatePost, { loading: submitLoading }] = useMutation(UPDATE_POST, {
    onCompleted: responseData => {
      postsFeed(postsFeed().map(post => {
        return post.id === responseData.updatePost.id ? responseData.updatePost : post;
      }));

      history.push('/dashboard');
    },
    onError: err => {
      const msg = err.message === 'User Input Validation Error'
        ? err.graphQLErrors[0].extensions.errors[0].message
        : err.message;
      setSubmitError(msg);
    }
  });

  const onSubmit = responseData => {
    updatePost({ variables: { id: Number(match.params.id), input: responseData }});
  };

  const [ singlePostUpload ] = useMutation(POST_UPLOAD_FILE, {
    onCompleted: ({ singlePostUpload }) => {
      const { url, previewUrl } = singlePostUpload;

      postsFeed(postsFeed().map(cachedPost => {
        return cachedPost.id === match.params.id ? { ...cachedPost, url, previewUrl } : cachedPost;
      }));

    },
    onError: err => setSubmitError(err.message),
  });

  const fileHandleChange = file => singlePostUpload({ variables: { id: match.params.id, file }});

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
