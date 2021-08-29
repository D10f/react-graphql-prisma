import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import * as constants from '@constants';

const useStyles = makeStyles({
  drawer: {
    width: constants.DRAWER_WIDTH
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
});

const Sidebar = () => {

  const history  = useHistory();
  const location = useLocation();
  const classes  = useStyles();

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

        <List>
          {constants.SIDEBAR_ITEMS.map(item => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
    </Hidden>
  );
};

export default Sidebar;