import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Feed, RegisterPage } from '@pages';
import { GET_PUBLIC_POSTS, GET_FAVORITE_POSTS } from '@services/posts/queries';
import { publicFeedVar, favoriteFeedVar } from '@services/cache';

/**
 * Returns a component passing different prop values, based on the router's pathname
 */
const mapLocationToProps = ({ location }, Component) => {
  switch (location.pathname.toLowerCase()) {
    case '/':
      return <Component cache={publicFeedVar} query={GET_PUBLIC_POSTS} />;
    case '/feed':
      return <Component cache={favoriteFeedVar} query={GET_FAVORITE_POSTS} />;
  }
};

const Routes = (props) => (
  <Switch>
    <Route
      exact
      path='/'
      render={props => mapLocationToProps(props, Feed) }
    />

    <PrivateRoute
      exact
      path={['/feed', '/favorites']}
      render={props => mapLocationToProps(props, Feed) }
    />

    <Route path='/register' component={RegisterPage} />
  </Switch>
);

export default Routes;
