import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';

import { PADI_COLORS } from '@enums';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  submitBtn: {
    background: PADI_COLORS.OPEN_WATER
  },
}));

const CommentForm = ({ loading }) => {

  const classes = useStyles();

  return (
    <>
      <TextField
        label="Leave a comment"
        variant="outlined"
        className={classes.field}
        multiline
        minRows={2}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitBtn}
        disableElevation
        disabled={loading}
        endIcon={loading ? <CircularProgress size={22} color="secondary" /> :<SendIcon />}
      >
        Submit
      </Button>

    </>
  );
};

export default CommentForm;
