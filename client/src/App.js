import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from '@services/apollo/client';
import Routes from '@components/Routing/Routes';
import Layout from '@components/Layout';

import { createTheme, ThemeProvider } from '@material-ui/core';
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[600]
    },
    secondary: {
      main: amber[600]
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
