import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import PostComment from './PostComment';

const useStyles = makeStyles(theme => ({
  commentCount: {
    display: 'block',
    textAlign: 'right',
    margin: '1rem 0'
  },
}));

const PostCommentList = ({ comments, handleError }) => {

  const classes = useStyles();
  const commentsLength = comments.length;

  return (
    <>
      <Typography color="textSecondary" className={classes.commentCount}>
        {commentsLength === 1 && `${commentsLength} Comment`}
        {commentsLength  >  1 && `${commentsLength} Comments`}
      </Typography>
      {comments.map(comment => <PostComment key={comment.id} handleError={handleError} {...comment} />)}
    </>
  );
};

export default PostCommentList;
