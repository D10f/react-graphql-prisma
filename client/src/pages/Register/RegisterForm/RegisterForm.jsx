import { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import SendIcon from '@material-ui/icons/Send';

import { PADI_CERTS } from '@enums';

const useStyles = makeStyles({
  mb2: {
    marginBottom: '10'
  },
  field: {
    margin: [5, 0]
  }
});

const RegisterForm = () => {

  const classes = useStyles();

  const [ username, setUsername ] = useState({ value: '', error: false });
  const [ email, setEmail ] = useState({ value: '', error: false });
  const [ password, setPassword ] = useState({ value: '', error: false });
  const [ details, setDetails ] = useState({ value: '', error: false });
  const [ certification, setCertification ] = useState(PADI_CERTS.OPEN_WATER);

  const [ users, setUsers ] = useState([]);

  const handleSubmit = e => {
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
    if (!details.value) {
      setDetails(previous => ({ ...previous, error: true }));
      errors = true;
    }

    if (errors) return;

    setUsers(previous => [ ...previous, { username, email, password, certification, details }]);
  };

  return (
    <>

      <Container className={classes.mb2}>
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Add New Log Entry
        </Typography>
      </Container>

      <Container>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            error={username.error}
            onChange={e => setUsername({ value: e.target.value, error: false })}
            className={classes.field}
            required
            label="Username"
            variant="outlined"
          />

          <TextField
            error={email.error}
            onChange={e => setEmail({ value: e.target.value, error: false })}
            className={classes.field}
            required
            label="Email"
            variant="outlined"
          />

          <TextField
            error={password.error}
            onChange={e => setPassword({ value: e.target.value, error: false })}
            className={classes.field}
            required
            label="Password"
            type="password"
            variant="outlined"
          />

          <TextField
            error={details.error}
            onChange={e => setDetails({ value: e.target.value, error: false })}
            className={classes.field}
            required
            label="Details"
            variant="outlined"
            multiline
            rows={2}
          />

          <FormControl className={classes.field}>
            <FormLabel>Certification</FormLabel>
            <RadioGroup label="Certification" value={certification} onChange={e => setCertification(e.target.value)}>
              {Object.values(PADI_CERTS).map(cert => (
                <FormControlLabel key={cert} label={cert} value={cert} control={<Radio />} />
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon/>}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default RegisterForm;
