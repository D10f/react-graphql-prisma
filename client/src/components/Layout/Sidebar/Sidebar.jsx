import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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

const menuItems = [
  {
    text: 'Public',
    icon: <PublicOutlinedIcon color="primary" />,
    path: '/'
  },
  {
    text: 'Feed',
    icon: <BookmarkBorderOutlinedIcon color="primary" />,
    path: '/feed'
  },
  {
    text: 'Favorites',
    icon: <FavoriteBorderIcon color="primary" />,
    path: '/favorites'
  },
  {
    text: 'My Dives',
    icon: <SubjectOutlined color="primary" />,
    path: '/dashboard'
  },
  {
    text: 'Log New Dive',
    icon: <AddCircleOutlineOutlined color="primary" />,
    path: '/register'
  },
];

const Sidebar = () => {

  const history  = useHistory();
  const location = useLocation();
  const classes  = useStyles();

  return (
    <nav>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h4" component="h2" align="center" className={classes.title}>
          {constants.WEBAPP_NAME}
        </Typography>

        <List>
          {menuItems.map(item => (
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
    </nav>
  );
};

export default Sidebar;
