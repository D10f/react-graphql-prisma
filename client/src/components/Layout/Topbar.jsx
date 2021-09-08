import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';
import { useReactiveVar, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Toast from '@components/Toast';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import { LOGOUT_USER } from '@services/apollo/users/mutations';
import { GET_NOTIFICATIONS } from '@services/apollo/users/queries';
import localStorageService from '@services/localStorage';

import { selectCertificationColor, selectPathnameComponents } from '@utils/selectors';

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
    link: {
      color: theme.palette.grey[900]
    },
    avatar: {
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
    },
    profileMenu: {
      marginTop: '3rem',
      marginLeft: '-1rem'
    }
  };
});

const Topbar = ({ setIsOpen }) => {

  const location = useLocation();
  const history = useHistory();
  const loggedInAs = useReactiveVar(authenticationVar);
  const classes = useStyles({ certification: PADI_CERTS[loggedInAs?.certification] });

  const [ routePath ] = selectPathnameComponents(location);

  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ logoutUser ] = useMutation(LOGOUT_USER, { variables: { id: loggedInAs?.id } });

  const { data } = useQuery(GET_NOTIFICATIONS, {
    variables: { id: loggedInAs?.id },
    fetchPolicy: "network-only",
    pollInterval: NOTIFICATIONS_POLL_INTERVAL,
    notifyOnNetworkStatusChange: true,
    onError: err => setError(err.message),
  });

  const handleClose = (e) => setAnchorEl(null);

  const handleLogout = () => {
    logoutUser();
    handleClose();
    authenticationVar(null);
    localStorageService.remove('token');
    history.push('/login');
  };

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
            <Badge
              className={classes.badge}
              color="secondary"
              badgeContent={data?.getUserNotifications.length || 0} max={99}
            >
              <Avatar
                src={loggedInAs.url}
                alt={loggedInAs.username.toUpperCase()}
                className={classes.avatar}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {loggedInAs?.username[0].toUpperCase()}
              </Avatar>
            </Badge>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.profileMenu}
            >
              <MenuItem>
                <Link
                  to={`/user/${loggedInAs.id}`}
                  onClick={handleClose}
                  className={classes.link}
                >Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
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
