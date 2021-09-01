import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { authenticationVar } from '@services/apollo/cache';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import * as constants from '@constants';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: constants.DRAWER_WIDTH,
    // [theme.breakpoints.down('sm')]: {
    //   width: 0
    // }
  },
  drawerPaper: {
    width: constants.DRAWER_WIDTH
  },
  active: {
    background: '#f4f4f4'
  },
  title: {
    padding: 20
  }
}));

const Sidebar = () => {

  const history  = useHistory();
  const location = useLocation();
  const classes  = useStyles();
  const loggedInAs = useReactiveVar(authenticationVar);

  return (
    <Hidden>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="permanent"
        open={true}
        anchor="left"
      >

        <Typography
          variant="h4"
          component="h2"
          align="center"
          className={classes.title}
        >
          {constants.WEBAPP_NAME}
        </Typography>

        <Divider/>

        <List>
          {constants.SIDEBAR_ITEMS.map(item => {
            // onlyPublic routes show when you are NOT logged in
            if (loggedInAs && item.onlyPublic) {
              return null;
            }

            // not public routes show when you ARE logged in
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

      </Drawer>
    </Hidden>
  );
};

export default Sidebar;
