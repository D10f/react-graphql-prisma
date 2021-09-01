import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';
import Toast from '@components/Toast';
import CardItem from '@components/CardItem';
import Masonry from 'react-masonry-css';

import { authenticationVar, favoriteFeedVar, publicFeedVar } from '@services/apollo/cache';
import { LIKE_POST } from '@services/posts/mutations';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
};

const useStyles = makeStyles(theme => ({
  fullHeight: {
    minHeight: (items) => items ? '100vh' : '0vh'
  }
}));

const Grid = ({ items }) => {

  const classes = useStyles({ items: items.length });
  const [ error, setError ] = useState('');

  const loggedInAs = authenticationVar()?.id;

  const [ likeOrUnlikePost, { data, loading, client }] = useMutation(LIKE_POST, {
    onCompleted: ({ likeOrUnlikePost: { id, likeCount, likedBy } }) => {
      publicFeedVar(publicFeedVar().map(post => {
        return post.id === id ? { ...post, likeCount, likedBy } : post;
      }));

      favoriteFeedVar(favoriteFeedVar().map(post => {
        return post.id === id ? { ...post, likeCount, likedBy } : post;
      }));
    },
    onError: (err) => setError(err.message)
  });

  const giveALike = useCallback(postId => {
    likeOrUnlikePost({ variables: { postId } });
  }, []);

// className={classes.fullHeight}

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map(item => (
          <CardItem
            {...item}
            key={item.id}
            loggedInAs={loggedInAs}
            giveALike={giveALike}
          />
        ))}
      </Masonry>
      {error && (
        <Toast
          message={error}
          severity='error'
          onClose={() => setError('')}
        />
      )}
    </Container>
  );
};
// {errorMsg && (
//   <Snackbar
//   open={!!errorMsg}
//   autoHideDuration={6000}
//   onClose={() => setError('')}
//   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//   >
//   <Alert severity="error">
//   {errorMsg}
//   </Alert>
//   </Snackbar>
// )}

export default Grid;
