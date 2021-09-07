import { makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  email: {
    required: true,
    pattern: /\w{2,}@\w+\.\w{2,3}(\.\w{2,3})?$/,
    maxLength: 64
  },
  password: {
    required: true,
    minLength: 10,
    maxLength: 100
  },
  confirmPassword: {
    required: true,
    minLength: 10,
    maxLength: 100
  }
};

const RegisterForm = ({ onSubmit, loading }) => {

  const classes = useStyles();
  const { control, handleSubmit, formState: { errors } } = useForm();

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
          name="email"
          control={control}
          defaultValue=""
          rules={validators.email}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              className={classes.field}
              error={!!errors?.email}
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

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={validators.password}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              variant="outlined"
              type="password"
              className={classes.field}
              error={!!errors?.confirmPassword}
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
          SignUp
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
