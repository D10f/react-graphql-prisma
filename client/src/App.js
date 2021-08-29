import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicFeed, RegisterPage } from '@pages';
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
          <Switch>
            <Route exact path="/" component={PublicFeed} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
