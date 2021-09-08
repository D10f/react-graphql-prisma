import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';
import LoginForm from './LoginForm';
import Toast from '@components/Toast';

import { LOGIN_USER } from '@services/apollo/users/mutations';
import localStorageService from '@services/localStorage';

const LoginPage = ({ history, location }) => {

  const [ error, setError ] = useState('');

  const [ loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: responseData => {
      authenticationVar(responseData.loginUser);
      localStorageService.set('token', authenticationVar());
      history.push(location?.state?.referrer || '/');
    },
    onError: (err) => {
      const msg = err.message === 'User Input Validation Error'
        ? err.graphQLErrors[0].extensions.errors[0].message
        : err.message;
      setError(msg);
    },
  });

  const onSubmit = async ({ username, password }) => {
    loginUser({ variables: { username, password } });
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} loading={loading} />
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

export default LoginPage;
