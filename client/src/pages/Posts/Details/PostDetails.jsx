import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import QueryResult from '@components/QueryResult';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PostCommentList from './PostCommentList';
import CommentForm from './CommentForm';

import { GET_POST_DETAILS } from '@services/posts/queries';

const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: '2rem'
  },
  postImage: {
    textAlign: 'center',
    marginBottom: '2rem'
  }
}));

const PostDetails = ({ match }) => {

  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id }
  });

  return (
    <QueryResult error={error} loading={loading} >
      <Container maxWidth="md">

        <Typography
          variant="h4"
          component="h2"
          color="textSecondary"
        >
          {data?.getPostDetails.title}
        </Typography>

        <Divider className={classes.divider}/>

        <Container className={classes.postImage}>
          {data?.getPostDetails?.url && (
            <img src={data.getPostDetails.url} alt="Main image accompanying the post" />
          )}
        </Container>

        <Typography>
          {data?.getPostDetails.body}
        </Typography>

        {data?.getPostDetails.allowComments && (
          <CommentForm loading={loading}/>
        )}

        <PostCommentList comments={data?.getPostDetails.comments || []} />

      </Container>
    </QueryResult>
  );
};

export default PostDetails;
