import { Route, Redirect } from 'react-router-dom';
import { authenticationVar } from '@services/cache';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authenticationVar()) {
        return <Component {...props} />
      }
      return <Redirect to="/" />
    }}
  />
);

export default PrivateRoute;
