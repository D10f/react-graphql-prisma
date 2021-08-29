import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from './App';

import './styles.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `${Math.random()}`
  }
});

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
