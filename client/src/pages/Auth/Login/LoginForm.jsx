import { makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3)
  }
}));

const validators = {
  username: {
    required: true,
    minLength: 2,
    maxLength: 64
  },
  password: {
    required: true,
    minLength: 10,
    maxLength: 100
  }
};

const LoginForm = ({ onSubmit, loading }) => {

  const classes = useStyles();
  const { register, control, handleSubmit, formState: { errors } } = useForm();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={validators.username}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              className={classes.field}
              error={!!errors?.username}
              fullWidth
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={validators.password}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type="password"
              className={classes.field}
              error={!!errors?.password}
              fullWidth
              required
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          disabled={loading}
          endIcon={loading ? <CircularProgress size={22} color="secondary" /> :<SendIcon />}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
