import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';
import localStorageService from '@services/localStorage';
import { makeStyles } from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import { selectCertificationColor } from '@utils/selectors';
import { LOGOUT_USER } from '@services/apollo/users/mutations';

const useStyles = makeStyles(theme => ({
  profileMenu: {
    marginTop: '3rem',
    marginLeft: '-1rem'
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
}));

const Profile = ({ id, username, url }) => {

  const history = useHistory();
  const classes = useStyles();
  const [ profileIcon, setProfileIcon ] = useState(null);

  const [ logoutUser ] = useMutation(LOGOUT_USER, {
    variables: { id }
  });

  const handleClose = () => setProfileIcon(null);

  const handleLogout = () => {
    logoutUser();
    handleClose();
    authenticationVar(null);
    localStorageService.remove('token');
    history.push('/login');
  };

  return (
    <>
      <Avatar
        src={url}
        alt={username.toUpperCase()}
        className={classes.avatar}
        onClick={(e) => setProfileIcon(e.currentTarget)}
      >
        {username[0].toUpperCase()}
      </Avatar>
      <Menu
        id="profile-menu"
        anchorEl={profileIcon}
        keepMounted
        open={Boolean(profileIcon)}
        onClose={handleClose}
        className={classes.profileMenu}
      >
        <MenuItem>
          <Link
            to={`/user/${id}`}
            onClick={handleClose}
            className={classes.link}
          >
            Profile
          </Link>
        </MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
