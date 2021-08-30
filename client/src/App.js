import { BrowserRouter as Router } from 'react-router-dom';
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
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
