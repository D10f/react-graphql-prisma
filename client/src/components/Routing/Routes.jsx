import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { FeedPage, RegisterPage, LoginPage, PostFormPage, PostDetails } from '@pages';

const Routes = () => (
  <Switch>

    <Route exact path='/' component={FeedPage} />
    <PrivateRoute exact path={['/dashboard', '/favorites']} component={FeedPage} />
    <PrivateRoute path='/new-trek' component={PostFormPage} />
    <PrivateRoute path='/trek/:id' component={PostDetails} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />

  </Switch>
);

export default Routes;
