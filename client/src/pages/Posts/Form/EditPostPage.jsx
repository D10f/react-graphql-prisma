import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { authorFeedVar } from '@services/apollo/cache';
import Toast from '@components/Toast';
import QueryResult from '@components/QueryResult';
import { UPDATE_POST } from '@services/posts/mutations';
import { GET_POST_DETAILS } from '@services/posts/queries';

import PostForm from './PostForm';

const EditFormPage = ({ history, match }) => {

  const [ submitError, setSubmitError ] = useState('');

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id }
  });

  const [ updatePost, { loading: submitLoading }] = useMutation(UPDATE_POST, {
    onCompleted: responseData => {
      authorFeedVar(authorFeedVar().map(post => {
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

  return (
    <QueryResult error={error} loading={loading}>
      <PostForm
        onSubmit={onSubmit}
        loading={submitLoading}
        post={data?.getPostDetails}
      />
      {error && (
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
