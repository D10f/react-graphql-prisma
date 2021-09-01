import { useLocation } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import padiColorMapper from '@utils/padiColorMapper';

import { DRAWER_WIDTH } from '@constants';
import { ROUTE_TITLES, PADI_CERTS } from '@enums';

import mario from '@assets/mario-av.png';

const useStyles = makeStyles(theme => {
  // console.log(theme);
  return {
    appbar: {
      // background: `linear-gradient(to right top, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      backgroundColor: theme.palette.primary.light,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      padding: '0 1rem',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    grow: {
      flexGrow: 1
    },
    avatar: {
      // marginLeft: 16,
      background: padiColorMapper,
      boxShadow: theme.shadows[1]
    },
    badge: {
      '&:hover': {
        cursor: 'default'
      }
    }
  };
});

const Sidebar = () => {

  const location = useLocation();
  const loggedInAs = useReactiveVar(authenticationVar);
  const classes = useStyles({ certification: PADI_CERTS[loggedInAs?.certification] });

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar>
        <Typography className={classes.grow}>
          {ROUTE_TITLES[location.pathname]}
        </Typography>

        { loggedInAs && (
          <Badge className={classes.badge} color="secondary" badgeContent={31} max={99} >
            <Avatar
              src="./image.jpg"
              alt={loggedInAs.username.toUpperCase()}
              className={classes.avatar}
            />
          </Badge>
        )}

      </Toolbar>
    </AppBar>
  );
};

// {!loggedInAs.avatar && loggedInAs.username[0].toUpperCase()}
export default Sidebar;
