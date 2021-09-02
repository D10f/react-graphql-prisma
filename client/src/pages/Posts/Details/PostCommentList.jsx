import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import PostComment from './PostComment';
import { NO_COMMENTS_YET } from '@constants';

const useStyles = makeStyles(theme => ({
  commentCount: {
    display: 'block',
    textAlign: 'right',
    margin: '1rem 0'
  },
}));

const PostCommentList = ({ comments }) => {

  const classes = useStyles();
  const commentsLength = comments.length;

  return (
    <>
      <Typography color="textSecondary" className={classes.commentCount}>
        {commentsLength === 0 && NO_COMMENTS_YET}
        {commentsLength === 1 && `${commentsLength} Comment`}
        {commentsLength   > 1 && `${commentsLength} Comments`}
      </Typography>
      {comments.map(comment => <PostComment key={comment.id} {...comment} />)}
    </>
  );
};

export default PostCommentList;
