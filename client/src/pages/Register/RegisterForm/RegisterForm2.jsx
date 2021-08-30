import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
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
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextField
          label="Username"
          variant="outlined"
          className={classes.field}
          fullWidth
          required
        />

        <TextField
          label="Email"
          variant="outlined"
          className={classes.field}
          fullWidth
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={classes.field}
          fullWidth
          required
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
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
