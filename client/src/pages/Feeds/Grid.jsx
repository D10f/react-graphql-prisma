import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Toast from '@components/Toast';
import Masonry from 'react-masonry-css';
import CardItem from './CardItem';

import { authenticationVar, authorFeedVar, favoriteFeedVar, publicFeedVar } from '@services/apollo/cache';
import { LIKE_POST } from '@services/posts/mutations';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
};

const useStyles = makeStyles(theme => ({
  fullHeight: {
    minHeight: (items) => items ? '100vh' : '0vh'
    // minHeight: '100vh'
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

      authorFeedVar(authorFeedVar().map(post => {
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
