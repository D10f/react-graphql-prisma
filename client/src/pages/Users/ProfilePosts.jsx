import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { profilePosts } from '@services/apollo/cache';

import Grid from '@components/Grid';
import InfiniteScroll from '@components/InfiniteScroll';

import { GET_POST_BY_AUTHOR } from '@services/apollo/posts/queries';
import { PER_PAGE } from '@constants';
import { selectFeedPosts } from '@utils/selectors';

// This is the horizontal 'who like this post' avatars
// const useStyles = makeStyles(theme => ({
//   latestPosts: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   post: {
//     padding: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//     width: '40%'
//   },
//   postTitle: {
//     color: theme.palette.text.primary,
//     fontFamily: theme.typography.h5.fontFamily,
//     fontSize: theme.typography.h5.fontSize,
//     textDecoration: 'none',
//     '&:hover': {
//       color: theme.palette.primary.main,
//     }
//   },
//   postLikes: {
//     padding: '1rem',
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center'
//   },
//   avatar: {
//     '&:not(:nth-child(1))': {
//       marginLeft: -theme.spacing(1)
//     }
//   },
//   likeIcon: {
//   },
//   counter: {
//     marginRight: theme.spacing(2),
//     fontSize: '0.8rem',
//     fontFamily: 'Sans-serif',
//     color: '#757575',
//     marginLeft: 10
//   },
// }));

const ProfilePosts = ({ authorId }) => {

  const location = useLocation();
  const posts = useReactiveVar(profilePosts);

  const [ startQuery , { data, loading, error }] = useLazyQuery(GET_POST_BY_AUTHOR, {
    onCompleted: response => {
      if (response.getPostsByAuthor.length > 0) {
        const newUniqueValues = response.getPostsByAuthor.filter(post => {
          return !posts.some(p => p.id === post.id);
        });
        profilePosts([
          ...posts,
          ...newUniqueValues
        ]);
      }
    },
  });

  // Make initial server request
  useEffect(() => {
    startQuery({ variables: { id: authorId, limit: PER_PAGE, skip: 0 }, fetchPolicy: 'network-only' });
  }, []);

  return (
    <InfiniteScroll
      nextItems={data && data.getPostsByAuthor}
      fetchNext={() => {
        startQuery({ variables: { id: authorId, limit: PER_PAGE, skip: posts.length }})
      }}
      loading={loading}
      error={error}
    >
      <Grid items={selectFeedPosts(posts, location)} />
    </InfiniteScroll>
  );
};

export default ProfilePosts;
