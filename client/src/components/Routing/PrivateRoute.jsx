import { Route, Redirect } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authenticationVar()) {
        return <Component {...props} />
      }
      return <Redirect to={{
        pathname: '/login',
        state: { referrer: rest.computedMatch.url }
      }} />
    }}
  />
);

export default PrivateRoute;
