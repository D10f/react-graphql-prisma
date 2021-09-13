import { useState } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { authenticationVar, currentPostComments } from '@services/apollo/cache';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import QueryResult from '@components/QueryResult';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostCommentList from './PostCommentList';
import CommentForm from './CommentForm';
import Toast from '@components/Toast';

import { postPublishedDate, fullDate } from '@utils/parseTime';
import { selectCertificationColor } from '@utils/selectors';
import { EDIT_POST_TOOLTIP, DELETE_POST_TOOLTIP, DRAWER_WIDTH } from '@constants';
import { PADI_CERTS, PADI_COLORS } from '@enums';
import { GET_POST_DETAILS } from '@services/apollo/posts/queries';
import { DELETE_POST } from '@services/apollo/posts/mutations';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    padding: '1rem 0',
  },
  avatar: {
    boxShadow: theme.shadows[1],
    background: ({ certification }) => selectCertificationColor(certification)
  },
  authorLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: theme.typography.body1.fontSize,
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  postAuthor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    // paddingLeft: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionBtnsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 0,
  },
  imageContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  postImage: {
    width: '100%',
    objectFit: 'contain'
  },
  divider: {
    margin: theme.spacing(1)
  },
  paddingless: {
    padding: 0
  },
  deleteBtn: {
    background: PADI_COLORS.INSTRUCTOR,
    color: theme.palette.grey[100],
  },
  modalContent: {
    display: 'flex',
    gap: theme.spacing(1),
    padding: 0,
    marginTop: theme.spacing(3)
  }
}));

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 50,
    left: DRAWER_WIDTH,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    height: 'min-content'
  }
};

const PostDetails = ({ match, history }) => {

  const loggedInAs = authenticationVar();

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id },
    onCompleted: ({ getPostDetails }) => {
      currentPostComments(getPostDetails.comments);
    },
    onError: err => {
      if (err.message.includes('non-nullable')) {
        setTimeout(() => history.push('/'), 1000);
      }
    }
  });

  const [ deletePost ] = useMutation(DELETE_POST, {
    variables: { id: match.params.id },
    onCompleted: () => {
      setDeleteLoading(false);
      history.push('/');
    },
    onError: err => {
      setDeleteLoading(false);
      submitError(err.message);
    }
  });

  useReactiveVar(currentPostComments);
  const classes = useStyles({ certification: PADI_CERTS[data?.getPostDetails.author.certification] });
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ submitError, setSubmitError ] = useState(false);
  const [ deleteLoading, setDeleteLoading ] = useState(false);

  return (
    <QueryResult error={error} loading={loading} >
      <Container maxWidth="md">

        <Container className={classes.postAuthor}>
          <Avatar
            src={data?.getPostDetails.author.url}
            alt={data?.getPostDetails.author.username}
            className={classes.avatar}
          >
            {data?.getPostDetails.author.username[0]}
          </Avatar>

          <Container className={classes.paddingless}>
            <Typography variant="subtitle2" component="p">
              {/*data?.getPostDetails.author.username*/}
              <Link className={classes.authorLink} to={`/user/${data?.getPostDetails.author.id}`}>
                {data?.getPostDetails.author.username}
              </Link>
            </Typography>

            <Tooltip title={data && fullDate(data.getPostDetails.createdAt)}>
              <Typography variant="subtitle2" component="p">
                {data && postPublishedDate(data.getPostDetails.createdAt)}
              </Typography>
            </Tooltip>
          </Container>

          {(loggedInAs?.id === data?.getPostDetails.author.id || loggedInAs.role === 'ADMIN') && (
            <Container className={classes.actionBtnsContainer}>
              <Tooltip title={EDIT_POST_TOOLTIP}>
                <Link to={`/edit-trek/${match.params.id}`}>
                  <IconButton aria-label="edit this comment">
                    <EditOutlinedIcon />
                  </IconButton>
                </Link>
              </Tooltip>

              <Tooltip title={DELETE_POST_TOOLTIP}>
                <IconButton
                  aria-label="delete this comment"
                  onClick={() => setModalOpen(true)}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Container>
          )}
        </Container>

        <Divider className={classes.divider}/>

        <Typography
          variant="h3"
          component="h2"
          color="textPrimary"
          className={classes.title}
        >
          {data?.getPostDetails.title}
        </Typography>

        <Container className={classes.imageContainer}>
          {data?.getPostDetails?.url && (
            <img
              className={classes.postImage}
              src={data.getPostDetails.url}
              alt="Main image accompanying the post"
            />
          )}
        </Container>

        <Typography>
          {data?.getPostDetails.body}
        </Typography>

        {data?.getPostDetails.allowComments && (
          <CommentForm postId={match.params.id} handleError={setSubmitError} />
        )}

        <PostCommentList comments={data?.getPostDetails.comments || []} handleError={setSubmitError} />

        <ReactModal
          style={modalStyles}
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          preventScroll={true}
        >
          <Container>
            <Typography variant="h5" component="h3" color="textPrimary">
              Are you sure you want to delete this post?
            </Typography>
            <Container className={classes.modalContent}>
              <Button
                disableElevation
                variant="contained"
                className={classes.deleteBtn}
                disabled={deleteLoading}
                onClick={() => {
                  setDeleteLoading(true);
                  deletePost();
                }}
                endIcon={deleteLoading ? <CircularProgress size={22} color="secondary" /> : <DeleteOutlined />}
              >
                Delete Post
              </Button>

              <Button
                disableElevation
                variant="outlined"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </Container>
          </Container>
        </ReactModal>

      </Container>
      {submitError && (
        <Toast
          message={submitError}
          severity='error'
          onClose={() => setSubmitError('')}
        />
      )}
    </QueryResult>
  );
};

export default PostDetails;
