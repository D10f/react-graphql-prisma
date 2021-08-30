import { PublicFeed } from '@pages';
import { GET_PUBLIC_POSTS, GET_FAVORITE_POSTS } from '@services/posts/queries';
import { publicFeedVar, favoriteFeedVar } from '@services/cache';

/**
 * Returns a component passing different prop values, based on the router's pathname
 */
export default ({ location }) => Component => {
  switch (location.pathname.toLowerCase()) {
    case '/feed':
      return <Component cache={favoriteFeedVar} query={GET_FAVORITE_POSTS} />
    default:
      return <Component cache={publicFeedVar} query={GET_PUBLIC_POSTS} />
  }
}
