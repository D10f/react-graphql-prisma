import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';
import RegisterForm from './RegisterForm';
import Toast from '@components/Toast';

import { REGISTER_USER } from '@services/users/mutations';

const RegisterPage = ({ history }) => {

  const [ error, setError ] = useState('');

  const [ registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: responseData => {
      authenticationVar(responseData.registerUser);
      localStorage.setItem('token', JSON.stringify(authenticationVar()));
      history.push('/');
    },
    onError: (err) => {
      const msg = err.message === 'User Input Validation Error'
        ? err.graphQLErrors[0].extensions.errors[0].message
        : err.message;
      setError(msg);
    },
  });

  const onSubmit = async data => {
    registerUser({ variables: { input: data } });
  };

  return (
    <>
      <RegisterForm onSubmit={onSubmit} loading={loading} />
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

export default RegisterPage;
