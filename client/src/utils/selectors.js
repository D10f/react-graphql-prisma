import { authenticationVar } from '@services/apollo/cache';
import { GET_PUBLIC_POSTS, GET_FAVORITE_POSTS, GET_AUTHOR_POSTS } from '@services/posts/queries';
import { PADI_CERTS, PADI_COLORS } from '@enums';

/**
 * Returns a gql query based on the present route
 */
export const selectFeedQuery = (location) => {
  switch (location.pathname.toLowerCase()) {
    case '/':
      return GET_PUBLIC_POSTS;
    case '/favorites':
      return GET_FAVORITE_POSTS;
    case '/dashboard':
      return GET_AUTHOR_POSTS;
  }
};

/**
 * Filters a list of posts based on the present route
 */
export const selectFeedPosts = (posts, location) => {
  const loggedInAs = authenticationVar();

  switch (location.pathname.toLowerCase()) {
    // For a public route all posts should be returned
    case '/':
      return posts;

    // Returns only those post the user has given a like to
    case '/favorites':
      return posts.filter(post => {
        return post.likedBy.some(user => user.id === loggedInAs.id);
      });

    // Returns only those posts that the user has created
    case '/dashboard':
      return posts.filter(post => {
        console.log(post);
        return post?.author?.id === loggedInAs.id
      });
  }
};

/**
 * Returns a color based on the user certification level
 */
export const selectCertificationColor = (certification) => {
  switch (certification) {
    case PADI_CERTS.OPEN_WATER:
      return PADI_COLORS.OPEN_WATER

    case PADI_CERTS.ADVANCED:
      return PADI_COLORS.ADVANCED

    case PADI_CERTS.RESCUE:
      return PADI_COLORS.RESCUE

    case PADI_CERTS.DIVEMASTER:
      return PADI_COLORS.DIVEMASTER

    default:
      return PADI_COLORS.DIVEMASTER
  }
};

/**
 * Returns a string of usernames, concatenated as "mario, luigi and peach liked this post"
 * If the list is 4+ then is formated as "mario, luigi, peach and 3 others liked this post"
 */
export const selectUsersWhoLikedPost = users => {
  if (users.length === 0) return '';
  if (users.length === 1) return `${users[0].username} liked this post`;

  if (users.length < 5) {
    return users
      .reduce((acc, current) => `${acc?.username || acc}, ${current.username}`)
      .replace(/,\s([\w\.\-]+)$/i, ' & $1')
      + ' liked this post';
  }

  const subset = users
    .slice(0, 4)
    .reduce((acc, current) => `${acc?.username || acc}, ${current.username}`);

  const rest = users.slice(4).length;

  return `${subset} & ${rest}` + ` ${rest > 1 ? 'others' : 'other'} liked this post`;
};
