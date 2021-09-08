import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import Badge from '@material-ui/core/Badge';

import { DELETE_NOTIFICATION } from '@services/apollo/users/mutations';

const useStyles = makeStyles(theme => ({
  notificationIcon: {
    marginRight: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer'
    }
  },
  notificationMenu: {
    marginTop: '3rem',
    marginLeft: '-3rem'
  },
  link: {
    color: theme.palette.grey[900]
  },
}));

const Notifications = ({ notifications }) => {

  const classes = useStyles();
  const [ notificationIcon, setNotificationIcon ] = useState(null);

  const [ deleteNotification ] = useMutation(DELETE_NOTIFICATION);

  const handleClose = () => setNotificationIcon(null);

  const handleNotificationClose = id => {
    console.log(id)
    deleteNotification({ variables: { id }});
    handleClose();
  };

  return (
    <>
      <IconButton
        className={classes.notificationIcon}
        aria-label={`Show ${notifications.length} notifications`}
        color="inherit"
        onClick={(e) => setNotificationIcon(e.currentTarget)}
      >
        <Badge color="secondary" badgeContent={notifications.length} max={99}>
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      <Menu
        id="notifications-menu"
        anchorEl={notificationIcon}
        keepMounted
        open={Boolean(notificationIcon)}
        onClose={handleClose}
        className={classes.notificationMenu}
      >
        {notifications.map(({ id, postId, message }) => (
          <MenuItem key={id}>
            <Link
              to={`/trek/${postId}`}
              onClick={() => handleNotificationClose(id)}
              className={classes.link}
            >
              {message}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Notifications;
