import { GET_PUBLIC_POSTS, GET_FAVORITE_POSTS, GET_AUTHOR_POSTS } from '@services/posts/queries';
import { publicFeedVar, authorFeedVar, favoriteFeedVar } from '@services/apollo/cache';

/**
 * Returns a component passing different prop values, based on the router's pathname
 */
export default (location) => {
  switch (location.pathname.toLowerCase()) {
    case '/':
      return { cache: publicFeedVar, query: GET_PUBLIC_POSTS };
    case '/favorites':
      return { cache: favoriteFeedVar, query: GET_FAVORITE_POSTS };
    case '/dashboard':
      return { cache: authorFeedVar, query: GET_AUTHOR_POSTS };
  }
};

/**
 * Returns a component passing different prop values, based on the router's pathname
 */
// export const mapLocationToProps = ({ location }, Component) => {
//   switch (location.pathname.toLowerCase()) {
//     case '/':
//       return <Component cache={publicFeedVar} query={GET_PUBLIC_POSTS} />;
//     case '/favorites':
//       return <Component cache={favoriteFeedVar} query={GET_FAVORITE_POSTS} />;
//     case '/dashboard':
//       return <Component cache={authorFeedVar} query={GET_AUTHOR_POSTS} />;
//   }
// };
