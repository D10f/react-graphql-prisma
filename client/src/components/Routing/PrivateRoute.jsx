import { Route, Redirect } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authenticationVar()) {
        return Component ? <Component {...props} /> : rest.render(props)
      }
      return <Redirect to="/" />
    }}
  />
);

export default PrivateRoute;
