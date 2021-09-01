import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Feed, RegisterPage, LoginPage, PostFormPage, PostDetails } from '@pages';
import { GET_PUBLIC_POSTS, GET_FAVORITE_POSTS, GET_AUTHOR_POSTS} from '@services/posts/queries';
import { publicFeedVar, authorFeedVar, favoriteFeedVar } from '@services/apollo/cache';

/**
 * Returns a component passing different prop values, based on the router's pathname
 */
const mapLocationToProps = ({ location }, Component) => {
  switch (location.pathname.toLowerCase()) {
    case '/':
      return <Component cache={publicFeedVar} query={GET_PUBLIC_POSTS} />;
    case '/favorites':
      return <Component cache={favoriteFeedVar} query={GET_FAVORITE_POSTS} />;
    case '/dashboard':
      return <Component cache={authorFeedVar} query={GET_AUTHOR_POSTS} />;
  }
};

const Routes = () => (
  <Switch>
    <Route
      exact
      path='/'
      render={props => mapLocationToProps(props, Feed) }
    />

    <PrivateRoute
      exact
      path={['/dashboard', '/favorites']}
      render={props => mapLocationToProps(props, Feed) }
    />

    <PrivateRoute path='/new-trek' component={PostFormPage} />
    <PrivateRoute path='/trek/:id' component={PostDetails} />

    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />
  </Switch>
);

export default Routes;
