import { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import SendIcon from '@material-ui/icons/Send';

import { PADI_CERTS } from '@enums';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3)
  },
  ml2: {
    marginLeft: theme.spacing(2)
  }
}));

const LoginForm = () => {

  const classes = useStyles();

  const [ username, setUsername ] = useState({ value: '', error: false });
  const [ password, setPassword ] = useState({ value: '', error: false });

  const handleSubmit = e => {
    e.preventDefault();

    let errors = false;

    if (!username.value) {
      setUsername(previous => ({ ...previous, error: true }));
      errors = true;
    }
    if (!password.value) {
      setPassword(previous => ({ ...previous, error: true }));
      errors = true;
    }

    if (errors) return;

  };

  return (
    <Container>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          fullWidth
          error={username.error}
          onChange={e => setUsername({ value: e.target.value, error: false })}
          className={classes.field}
          required
          label="Username"
          variant="outlined"
        />

        <TextField
          fullWidth
          error={password.error}
          onChange={e => setPassword({ value: e.target.value, error: false })}
          className={classes.field}
          required
          label="Password"
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
          Login
        </Button>

        <Button color="primary" size="small" className={classes.ml2}>
          Forgot Password?
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
