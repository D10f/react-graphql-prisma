import { InMemoryCache, makeVar } from '@apollo/client';
import localStorageService from '@services/localStorage';

// TODO: Define field policies
const cache = new InMemoryCache();

export default cache;

export const profilePosts = makeVar([]);
export const postsFeed = makeVar([]);
export const currentPostComments = makeVar([]);
export const authenticationVar = makeVar(localStorageService.get('token') || null);
