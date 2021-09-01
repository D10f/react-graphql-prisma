import { useLocation } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import padiColorMapper from '@utils/padiColorMapper';

import { DRAWER_WIDTH } from '@constants';
import { ROUTE_TITLES, PADI_CERTS } from '@enums';

import mario from '@assets/mario-av.png';

const useStyles = makeStyles({
  appbar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: 16,
    backgroundColor: padiColorMapper
  }
});

const Sidebar = () => {

  const location = useLocation();
  const classes = useStyles({ certification: PADI_CERTS.OPEN_WATER });
  const loggedInAs = useReactiveVar(authenticationVar);

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar>

        <Typography className={classes.grow}>
          {ROUTE_TITLES[location.pathname]}
        </Typography>

        { loggedInAs && (
          <>
            <Typography>
              {loggedInAs.username}
            </Typography>
            <Avatar
              src="./image.jpg"
              alt={loggedInAs.username.toUpperCase()}
              className={classes.avatar}
            />
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

// {!loggedInAs.avatar && loggedInAs.username[0].toUpperCase()}
export default Sidebar;
