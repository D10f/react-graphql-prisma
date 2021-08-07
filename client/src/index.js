import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, client } from './services/api';

import App from './App';

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
