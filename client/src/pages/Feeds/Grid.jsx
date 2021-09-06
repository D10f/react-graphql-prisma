import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Toast from '@components/Toast';
import Masonry from 'react-masonry-css';
import CardItem from './CardItem';

import { authenticationVar, postsFeed } from '@services/apollo/cache';
import { LIKE_POST } from '@services/posts/mutations';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
};

const useStyles = makeStyles(theme => ({
  fullHeight: {
    minHeight: (items) => items ? '100vh' : '0vh'
  },
  container: {
    maxWidth: 'calc(100% - 2rem)',
    padding: '0 1rem',
    margin: 0,
  }
}));

const Grid = ({ items }) => {

  const classes = useStyles({ items: items.length });
  const [ error, setError ] = useState('');

  const loggedInAs = authenticationVar();

  const [ likeOrUnlikePost, { data, loading, client }] = useMutation(LIKE_POST, {
    onCompleted: ({ likeOrUnlikePost: { id, likeCount, likedBy } }) => {
      postsFeed(postsFeed().map(post => {
        return post.id === id ? { ...post, likeCount, likedBy } : post;
      }));
    },
    onError: (err) => setError(err.message)
  });

  const giveALike = useCallback(postId => {
    likeOrUnlikePost({ variables: { postId } });
  }, []);

  return (
    <Container className={classes.container}>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.length > 0 && items.map(item => (
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

export default Grid;
