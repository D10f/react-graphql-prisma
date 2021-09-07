import { useLocation, useHistory } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';
import { useReactiveVar } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

// import padiColorMapper from '@utils/padiColorMapper';
import { selectCertificationColor, selectPathnameComponents } from '@utils/selectors';

import { DRAWER_WIDTH } from '@constants';
import { ROUTE_TITLES, PADI_CERTS } from '@enums';

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
      background: ({ certification }) => selectCertificationColor(certification),
      boxShadow: theme.shadows[1],
      '&:hover': {
        cursor: 'pointer'
      }
    },
    badge: {
      '&:hover': {
        cursor: 'default'
      }
    }
  };
});

const Topbar = () => {

  const location = useLocation();
  const history = useHistory();
  const loggedInAs = useReactiveVar(authenticationVar);
  const classes = useStyles({ certification: PADI_CERTS[loggedInAs?.certification] });

  const [ routePath ] = selectPathnameComponents(location);

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar>
        <Typography className={classes.grow}>
          {ROUTE_TITLES[routePath]}
        </Typography>

        {loggedInAs && (
          <Badge className={classes.badge} color="secondary" badgeContent={7} max={99} >
            <Avatar
              src={loggedInAs.url}
              alt={loggedInAs.username.toUpperCase()}
              className={classes.avatar}
              onClick={() => history.push(`/user/${loggedInAs.id}`)}
            >
              {loggedInAs?.username[0].toUpperCase()}
            </Avatar>
          </Badge>
        )}

      </Toolbar>
    </AppBar>
  );
};

// {!loggedInAs.avatar && loggedInAs.username[0].toUpperCase()}
export default Topbar;
