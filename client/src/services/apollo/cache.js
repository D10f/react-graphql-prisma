import { InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache();

export default cache;

export const profilePosts = makeVar([]);
export const postsFeed = makeVar([]);
export const currentPostComments = makeVar([]);
export const authenticationVar = makeVar(JSON.parse(localStorage.getItem('token')) || null);
