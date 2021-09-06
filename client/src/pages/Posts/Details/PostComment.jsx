import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';
import { selectCertificationColor } from '@utils/selectors';
import { PADI_COLORS, PADI_CERTS } from '@enums';
import { EDIT_COMMENT_TOOLTIP, STOP_EDIT_COMMENT_TOOLTIP, DELETE_COMMENT_TOOLTIP } from '@constants';
import { UPDATE_COMMENT, DELETE_COMMENT } from '@services/comments/mutations';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => {
  // console.log(theme);
  return {
    avatar: {
      boxShadow: theme.shadows[1],
      background: ({ certification }) => selectCertificationColor(certification)
    },
    submitBtn: {
      background: PADI_COLORS.OPEN_WATER
    },
    deleteBtn: {
      background: PADI_COLORS.INSTRUCTOR,
      color: theme.palette.grey[100]
    },
    actionBtnsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 0,
    },
    commentCard: {
      margin: '1rem 0',
      '&:last-child': {
        marginBottom: '4rem'
      }
    },
    commentContent: {
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '1rem'
    },
    commentAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      paddingLeft: 0,
    },
    commentTextEditMode: {
      boxShadow: theme.shadows[1],
      border: '1px solid #777',
      borderRadius: '5px',
      padding: '1rem',
      width: '100%'
    },
    paddingless: {
      padding: 0
    },
  }
});

const PostComment = ({ id, author, text, createdAt, handleError }) => {

  const { username, certification, url } = author;
  const classes = useStyles({ certification: PADI_CERTS[certification] });
  const loggedInAs = authenticationVar();

  const [ editing, setEditing ] = useState(false);
  const [ confirm, setConfirm ] = useState(false); // confirm delete
  const [ loading, setLoading ] = useState(false); // send update / delete query
  const [ content, setContent ] = useState(text);

  const [ updateComment ] = useMutation(UPDATE_COMMENT, {
    variables: { id, input: { text: content }},
    onCompleted: () => {
      setLoading(false);
      setEditing(false);
    },
    onError: err => {
      setLoading(false);
      handleError(err.message);
    },
  });

  const [ deleteComment ] = useMutation(DELETE_COMMENT, {
    variables: { id },
    onCompleted: () => {
      setLoading(false);
      setConfirm(false);
    },
    onError: err => {
      setLoading(false);
      handleError(err.message);
    },
  });

  return (
    <Card className={classes.commentCard}>
      <CardContent className={classes.commentContent}>
        <Container className={classes.commentAuthor}>
          <Avatar
            src={url}
            alt={username}
            className={classes.avatar}
          >
            {username[0]}
          </Avatar>

          <Container className={classes.paddingless}>
            <Typography variant="subtitle2" component="p">
              {username}
            </Typography>

            <Typography variant="subtitle2" component="p">
              {createdAt}
            </Typography>
          </Container>

          {(loggedInAs?.id === author?.id || loggedInAs.role === 'ADMIN') && (
            <Container className={classes.actionBtnsContainer}>
              <Tooltip title={editing ? STOP_EDIT_COMMENT_TOOLTIP : EDIT_COMMENT_TOOLTIP}>
                <IconButton
                  aria-label="edit this comment"
                  onClick={() => {
                    setConfirm(false);
                    setEditing(prev => !prev);
                  }}
                >
                  {editing ? <ClearOutlinedIcon /> : <EditOutlinedIcon />}
                </IconButton>
              </Tooltip>

              <Tooltip title={DELETE_COMMENT_TOOLTIP}>
                <IconButton
                  aria-label="delete this comment"
                  onClick={() => {
                    setEditing(false);
                    setConfirm(prev => !prev);
                  }}
                >
                  {confirm ? <ClearOutlinedIcon /> : <DeleteOutlined />}
                </IconButton>
              </Tooltip>
            </Container>
          )}
        </Container>

        <Typography
          className={editing ? classes.commentTextEditMode : null}
          contentEditable={editing}
          onInput={e => setContent(e.target.textContent)}
        >
          {text}
        </Typography>

        {(editing || confirm) && (
          <Button
            disableElevation
            variant="contained"
            color={editing ? "primary" : "status"}
            className={editing ? classes.submitBtn : classes.deleteBtn}
            disabled={loading}
            onClick={() => {
              setLoading(true);
              if (editing) updateComment();
              if (confirm) deleteComment();
            }}
            endIcon={(() => {
              if (loading) return <CircularProgress size={22} color="secondary" />;
              if (editing) return <SendIcon />;
              if (confirm) return <ErrorOutlineOutlinedIcon />;
            })()}
          >
            {editing ? 'Update Comment' : 'Delete Comment'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

/*
{loggedInAs?.id === author?.id && (
  <Tooltip title={'EDIT_COMMENT_TOOLTIP'}>
    <IconButton
      className={classes.pushRight}
      aria-label="edit this comment"
      onClick={() => setEditing(true)}
    >
      <EditOutlinedIcon />
    </IconButton>
  </Tooltip>
)}
*/

export default PostComment;
