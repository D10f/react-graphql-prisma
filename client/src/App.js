import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from '@services/apollo/client';
import Routes from '@components/Routing/Routes';
import Layout from '@components/Layout';

import { createTheme, ThemeProvider } from '@material-ui/core';
import lightBlue from '@material-ui/core/colors/lightBlue';
import lime from '@material-ui/core/colors/lime';
import red from '@material-ui/core/colors/red';

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[600],
    },
    secondary: {
      main: lime['A200']
    },
    status: {
      error: red[500]
    }
  }
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
