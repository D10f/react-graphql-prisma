import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { postsFeed } from '@services/apollo/cache';
import PostForm from './PostForm';
import Toast from '@components/Toast';
import { CREATE_POST } from '@services/apollo/posts/mutations';

const CreateFormPage = ({ history }) => {

  const [ error, setError ] = useState('');

  const [ createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: responseData => {
      postsFeed([ ...postsFeed(), responseData.createPost ]);
      history.push('/dashboard');
    },
    onError: err => {
      const msg = err.message === 'User Input Validation Error'
        ? err.graphQLErrors[0].extensions.errors[0].message
        : err.message;
      setError(msg);
    }
  });

  const onSubmit = data => createPost({ variables: { input: data }});

  return (
    <>
      <PostForm onSubmit={onSubmit} loading={loading} />
      {error && (
        <Toast
          message={error}
          severity='error'
          onClose={() => setError('')}
        />
      )}
    </>
  );
};

export default CreateFormPage;
