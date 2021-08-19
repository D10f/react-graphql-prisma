import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

class API {
  constructor(uri) {
    this.client = new ApolloClient({
      uri: uri || 'http://localhost:5000',
      cache: new InMemoryCache()
    });
    this.user = '';
    this.token = '';
  }

  clear() {
    this.user = '';
    this.token = '';
  }

  authenticate(user, token) {
    this.user = user;
    this.token = token;
  }

  isAuthenticated() {
    return this.token !== '';
  }

  requestTransform() {

  }
}

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache()
});

export { ApolloProvider, client };
