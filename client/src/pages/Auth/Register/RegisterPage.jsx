import { useMutation } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';
import RegisterForm from './RegisterForm';
import QueryResult from '@components/QueryResult';

import { REGISTER_USER } from '@services/users/mutations';
import { LOGGED_IN_USER } from '@services/users/queries';


const RegisterPage = ({ history }) => {

  const [ registerUser, { data, error, loading, client }] = useMutation(REGISTER_USER, {
    onCompleted: responseData => {
      authenticationVar(responseData.registerUser);
      localStorage.setItem('token', JSON.stringify(authenticationVar()));
      history.push('/feed');
    },
  });

  const onSubmit = async data => {
    registerUser({ variables: { input: data } });
  };

  return (
    <QueryResult error={error} onClose={() => { error = null; }}>
      <RegisterForm onSubmit={onSubmit} loading={loading} />
    </QueryResult>
  );
};

export default RegisterPage;
