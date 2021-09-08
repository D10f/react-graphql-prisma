import { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { authenticationVar } from '@services/apollo/cache';
import { useReactiveVar, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
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
import localStorageService from '@services/localStorage';

import { selectCertificationColor, selectPathnameComponents } from '@utils/selectors';

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
    }
  };
});

const Topbar = ({ setIsOpen }) => {

  const location = useLocation();
  const history = useHistory();
  const loggedInAs = useReactiveVar(authenticationVar);
  const classes = useStyles({ certification: PADI_CERTS[loggedInAs?.certification] });

  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ routePath ] = selectPathnameComponents(location);
  const [ logoutUser ] = useMutation(LOGOUT_USER, { variables: { id: loggedInAs?.id } });

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
            <Badge className={classes.badge} color="secondary" badgeContent={7} max={99} >
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
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
