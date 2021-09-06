import { useQuery } from '@apollo/client';
import { GET_POST_BY_AUTHOR } from '@services/posts/queries';
import QueryResult from '@components/QueryResult';
import { Link } from 'react-router-dom';
import { selectCertificationColor, selectUsersWhoLikedPost } from '@utils/selectors';

import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  latestPosts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  post: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '40%'
  },
  postTitle: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.h5.fontFamily,
    fontSize: theme.typography.h5.fontSize,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  postLikes: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  avatar: {
    '&:not(:nth-child(1))': {
      marginLeft: -theme.spacing(1)
    }
  },
  likeIcon: {
  },
  counter: {
    marginRight: theme.spacing(2),
    fontSize: '0.8rem',
    fontFamily: 'Sans-serif',
    color: '#757575',
    marginLeft: 10
  },
}));

const LatestPosts = ({ authorId }) => {

  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_POST_BY_AUTHOR, {
    variables: { id: authorId, limit: 5, skip: 0 }
  });

  return (
    <QueryResult error={error} loading={loading} >
      <Container className={classes.latestPosts}>
        <Typography variant="h5" component="h3" color="secondaryText">
          Last 5 posts
        </Typography>

        {data?.getPostsByAuthor.map(post => (
          <Paper className={classes.post}>
            <Link className={classes.postTitle} to={`/trek/${post.id}`}>
              {post.title}
            </Link>

            <Tooltip arrow title={selectUsersWhoLikedPost(post.likedBy)}>
              <Container className={classes.postLikes}>
                <FavoriteIcon className={classes.likeIcon} />
                <span className={classes.counter}>{post.likeCount}</span>
                {post.likedBy.slice(0,6).map(user => (
                  <Avatar
                    style={{ background: selectCertificationColor(user.certification) }}
                    className={classes.avatar}
                    src={user.url}
                    alt={user.username}
                  >
                    {user.username[0]}
                  </Avatar>
                ))}
              </Container>
            </Tooltip>
          </Paper>
        ))}
      </Container>
    </QueryResult>
  );
};

export default LatestPosts;
