import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import cache from './cache';

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))?.token}` || null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache
});

export default client;