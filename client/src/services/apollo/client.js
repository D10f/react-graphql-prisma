import { ApolloClient, ApolloLink, concat } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import cache from './cache';
import localStorageService from '@services/localStorage';

// const uploadLink = createUploadLink({ uri: 'http://localhost:5000/graphql' });
const uploadLink = createUploadLink({ uri: 'https://prismicadventures.xyz/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorageService.get('token')?.token}` || null,
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, uploadLink),
  cache
});

export default client;
