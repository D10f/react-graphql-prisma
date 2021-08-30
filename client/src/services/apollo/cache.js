import { InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       postsForPublicFeed(posts = [], { args }) {
  //         const skip  = args?.skip  || 0;
  //         const limit = args?.limit || 10;
  //         return publicFeedVar().slice(skip, limit);
  //       }
  //     }
  //   }
  // }
});

export default cache;

export const publicFeedVar = makeVar([]);
export const favoriteFeedVar = makeVar([]);
export const authenticationVar = makeVar(JSON.parse(localStorage.getItem('token')) || null);
