import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { FeedPage, RegisterPage, LoginPage, CreatePostPage, EditPostPage, PostDetails } from '@pages';

const Routes = () => (
  <Switch>

    <Route exact path='/' component={FeedPage} />

    <Route path='/register' component={RegisterPage} />

    <Route path='/login' component={LoginPage} />

    <PrivateRoute exact path={['/dashboard', '/favorites']} component={FeedPage} />

    <PrivateRoute path='/new-trek' component={CreatePostPage} />

    <PrivateRoute path='/edit-trek/:id' component={EditPostPage} />

    <PrivateRoute path='/trek/:id' component={PostDetails} />

  </Switch>
);

export default Routes;
