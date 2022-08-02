import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';
import { useReactiveVar, useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Toast from '@components/Toast';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import Profile from './Profile';
import Notifications from './Notifications';

import { selectPathnameComponents } from '@utils/selectors';
import { GET_NOTIFICATIONS } from '@services/apollo/users/queries';
import { NOTIFICATIONS_POLL_INTERVAL } from '@constants';
import { ROUTE_TITLES, PADI_CERTS } from '@enums';

const useStyles = makeStyles(theme => {
  // console.log(theme);
  return {
    appbar: {
      backgroundColor: theme.palette.primary.light,
      padding: '0.25rem 1rem',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    grow: {
      flexGrow: 1
    },
  };
});

const Topbar = ({ setIsOpen }) => {

  const location = useLocation();
  const loggedInAs = useReactiveVar(authenticationVar);
  const classes = useStyles({ certification: PADI_CERTS[loggedInAs?.certification] });

  const [error, setError] = useState(false);

  const [routePath] = selectPathnameComponents(location);

  const [loadNotifications, { data }] = useLazyQuery(GET_NOTIFICATIONS, {
    fetchPolicy: "network-only",
    pollInterval: NOTIFICATIONS_POLL_INTERVAL,
    notifyOnNetworkStatusChange: true,
    // onCompleted: data => console.log(data),
    onError: err => setError(err.message)
  });

  useEffect(() => {
    if (loggedInAs) {
      loadNotifications({ variables: { id: loggedInAs.id } });
    }
  }, [loggedInAs]);

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar>
        <IconButton
          onClick={() => setIsOpen(true)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Typography className={classes.grow}>
          {ROUTE_TITLES[routePath]}
        </Typography>

        {loggedInAs && (
          <>
            {data?.getUserNotifications.length > 0 && (
              <Notifications notifications={data.getUserNotifications} />
            )}

            <Profile
              id={loggedInAs.id}
              username={loggedInAs.username}
              url={loggedInAs.url}
            />

            {error && (
              <Toast
                message={error}
                severity='error'
                onClose={() => setError('')}
              />
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
