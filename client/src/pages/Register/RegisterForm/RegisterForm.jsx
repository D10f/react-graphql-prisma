import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import { REGISTER_USER } from '@services/users/mutations';
import { LOGGED_IN_USER } from '@services/users/queries';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3)
  }
}));

const RegisterForm = () => {

  const classes = useStyles();

  const [ username, setUsername ] = useState({ value: 'Rossman', error: false });
  const [ email, setEmail ] = useState({ value: 'ross@example.com', error: false });
  const [ password, setPassword ] = useState({ value: 'password123', error: false });
  const [ confirmPassword, setConfirmPassword ] = useState({ value: 'password123', error: false });

  const [ registerUser, { client, loading } ] = useMutation(REGISTER_USER, {
    update(cache, { data }) {
      client.writeQuery({
        query: LOGGED_IN_USER,
        data: {
          user: data.registerUser
        }
      });

      console.log(cache.data.data);
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    let errors = [];

    if (!username.value) errors.push(setUsername);
    if (!email.value) errors.push(setEmail);
    if (password.value !== confirmPassword.value) {
      errors.push(setPassword, setConfirmPassword);
    } else {
      if (!password.value) errors.push(setPassword);
      if (!confirmPassword.value) errors.push(setConfirmPassword);
    }

    if (errors.length) {
      // Each error a call to setState for the respective fields that failed validation
      return errors.forEach(error => error(previous => ({ ...previous, error: true })));
    };

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
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // if (error) {
  //   // If is not a validation error simply return the error
  //   if (error.message !== 'User Input Validation Error') {
  //     return <p>{error.message}</p>;
  //   }
  //
  //   // Else provide some feedback as to what user did wrong
  //   return error.graphQLErrors[0].extensions.errors.map(({ field, message }) => {
  //     return <p>{message}</p>;;
  //   });
  // }

  return (
    <Container>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Username"
          variant="outlined"
          error={username.error}
          value={username.value}
          onChange={e => setUsername({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
        />

        <TextField
          label="Email"
          variant="outlined"
          error={email.error}
          value={email.value}
          onChange={e => setEmail({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          error={password.error}
          value={password.value}
          onChange={e => setPassword({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          error={confirmPassword.error}
          value={confirmPassword.value}
          onChange={e => setConfirmPassword({ value: e.target.value, error: false })}
          className={classes.field}
          fullWidth
          required
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
