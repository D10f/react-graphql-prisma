import { useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { authenticationVar, currentPostComments } from '@services/apollo/cache';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import QueryResult from '@components/QueryResult';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PostCommentList from './PostCommentList';
import CommentForm from './CommentForm';
import Toast from '@components/Toast';

import { selectCertificationColor } from '@utils/selectors';
import { EDIT_POST_TOOLTIP, DELETE_POST_TOOLTIP } from '@constants';
import { PADI_CERTS } from '@enums';
import { GET_POST_DETAILS } from '@services/posts/queries';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    padding: '1rem 0',
  },
  avatar: {
    boxShadow: theme.shadows[1],
    background: ({ certification }) => selectCertificationColor(certification)
  },
  link: {
    color: theme.palette.grey['A400'],
    textDecoration: 'none',
    fontSize: theme.typography.subtitle1.fontSize,
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
}));

const PostDetails = ({ match }) => {

  const loggedInAs = authenticationVar();

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id },
    onCompleted: ({ getPostDetails }) => {
      currentPostComments(getPostDetails.comments);
    }
  });

  const classes = useStyles({ certification: PADI_CERTS[data?.getPostDetails.author.certification] });
  const [ submitError, setSubmitError ] = useState(false);
  const cachedComments = useReactiveVar(currentPostComments);

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
              {data?.getPostDetails.author.username}
            </Typography>

            <Typography variant="subtitle2" component="p">
              {data?.getPostDetails.createdAt}
            </Typography>
          </Container>

          {(loggedInAs?.id === data?.getPostDetails.author.id || loggedInAs.role === 'ADMIN') && (
            <Container className={classes.actionBtnsContainer}>
              <Tooltip title={EDIT_POST_TOOLTIP}>
                <Link
                  className={classes.link}
                  to={`/edit-trek/${match.params.id}`}
                >
                <IconButton aria-label="edit this comment">
                  <EditOutlinedIcon />
                </IconButton>
                </Link>
              </Tooltip>

              <Tooltip title={DELETE_POST_TOOLTIP}>
                <IconButton
                  aria-label="delete this comment"
                  onClick={() => {}}
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

/*

{loggedInAs?.id === data?.getPostDetails.author.id && (
  <Container className={classes.actionBtnsContainer}>
    <Tooltip title={EDIT_POST_TOOLTIP}>
      <Link
        className={classes.link}
        to={`/trek/${match.params.id}`}
      >
        {data?.getPostDetails.title}
      </Link>
    </Tooltip>

    <Tooltip title={DELETE_POST_TOOLTIP}>
      <IconButton
        aria-label="delete this comment"
        onClick={() => {}}
      >
        <DeleteOutlined />
      </IconButton>
    </Tooltip>
  </Container>
)}

*/

export default PostDetails;
