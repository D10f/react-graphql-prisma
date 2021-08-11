import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3)
  }
}));

const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput) {
    registerUser(input: $input) {
      id,
      username,
      email,
      password
    }
  }
`;

const RegisterForm = () => {

  const classes = useStyles();

  const [ username, setUsername ] = useState({ value: '', error: false });
  const [ email, setEmail ] = useState({ value: '', error: false });
  const [ password, setPassword ] = useState({ value: '', error: false });
  const [ confirmPassword, setConfirmPassword ] = useState({ value: '', error: false });

  const [ registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

  if (loading) return <p>'Loading...'</p>;
  if (error) {
    return <p>{error.message}</p>
  }

  const handleSubmit = async e => {
    e.preventDefault();

    let errors = false;

    if (!username.value) {
      setUsername(previous => ({ ...previous, error: true }));
      errors = true;
    }
    if (!email.value) {
      setEmail(previous => ({ ...previous, error: true }));
      errors = true;
    }
    if (!password.value) {
      setPassword(previous => ({ ...previous, error: true }));
      errors = true;
    }
    if (!confirmPassword.value) {
      setConfirmPassword(previous => ({ ...previous, error: true }));
      errors = true;
    }

    if (errors) return;

    const res = await registerUser({
      variables: {
        input: {
          username: username.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value
        }
      }
    });

    console.log(res);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          error={username.error}
          onChange={e => setUsername({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
          label="Username"
          variant="outlined"
        />

        <TextField
          error={email.error}
          onChange={e => setEmail({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
          label="Email"
          variant="outlined"
        />

        <TextField
          error={password.error}
          onChange={e => setPassword({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
          label="Password"
          type="password"
          variant="outlined"
        />

        <TextField
          error={password.error}
          onChange={e => setConfirmPassword({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
          label="Confirm Password"
          type="password"
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          endIcon={<SendIcon/>}
        >
          SignUp
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
