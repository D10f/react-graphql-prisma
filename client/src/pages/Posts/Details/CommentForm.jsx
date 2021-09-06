import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { currentPostComments } from '@services/apollo/cache';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';

import { CREATE_COMMENT } from '@services/comments/mutations';
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

const CommentForm = ({ postId, handleError }) => {

  const classes = useStyles();
  const [ text, setText ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const [ createComment ] = useMutation(CREATE_COMMENT, {
    variables: { input: { postId, text }},
    onCompleted: ({ createComment }) => {
      setLoading(false);
      currentPostComments([ ...currentPostComments(), createComment ])
    },
    onError: err => {
      setLoading(false);
      handleError(err.message);
    },
  });

  return (
    <>
      <TextField
        label="Leave a comment"
        variant="outlined"
        className={classes.field}
        multiline
        minRows={2}
        fullWidth
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.submitBtn}
        disableElevation
        disabled={loading}
        onClick={() => {
          setLoading(true);
          createComment();
        }}
        endIcon={loading ? <CircularProgress size={22} color="secondary" /> :<SendIcon />}
      >
        Submit
      </Button>
    </>
  );
};

export default CommentForm;
