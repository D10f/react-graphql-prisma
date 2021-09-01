import { InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache();

export default cache;

export const publicFeedVar = makeVar([]);
export const authorFeedVar = makeVar([]);
export const favoriteFeedVar = makeVar([]);
export const authenticationVar = makeVar(JSON.parse(localStorage.getItem('token')) || null);
