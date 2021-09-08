import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import * as constants from '@constants';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: constants.DRAWER_WIDTH,
  },
  active: {
    background: '#f4f4f4'
  },
  title: {
    padding: 20
  }
}));

const Sidebar = ({ isOpen, setIsOpen }) => {

  const history  = useHistory();
  const location = useLocation();
  const classes  = useStyles();
  const loggedInAs = useReactiveVar(authenticationVar);

  const toggleDrawer = (event) => {
    if (event && event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // <Typography
  //   variant="h4"
  //   component="h2"
  //   align="center"
  //   className={classes.title}
  // >
  //   {constants.WEBAPP_NAME}
  // </Typography>
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => {}}
      onKeyDown={toggleDrawer}
    >
      <List
        onClick={() => setIsOpen(false)}
        className={classes.drawer}
      >
        {constants.SIDEBAR_ITEMS.map(item => {
          // onlyPublic routes show only when you are NOT logged in
          if (loggedInAs && item.onlyPublic) {
            return null;
          }

          // not public routes show only when you ARE logged in
          if (!loggedInAs && !item.public) {
            return null;
          }

          return (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
