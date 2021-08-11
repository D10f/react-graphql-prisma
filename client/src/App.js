import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';

import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';

import { UsersPage, RegisterPage, LoginPage } from '@pages';
import { Layout } from '@components';

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
            <Route exact path="/" component={UsersPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
