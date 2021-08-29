import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { DRAWER_WIDTH } from '@constants';
import { ROUTE_TITLES } from '@enums';

import mario from '@assets/mario-av.png';

const useStyles = makeStyles({
  appbar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: 16
  }
});

const Sidebar = () => {

  const location = useLocation();
  const classes = useStyles();

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar>

        <Typography className={classes.grow}>
          {ROUTE_TITLES[location.pathname]}
        </Typography>

        <Typography>
          Mario
        </Typography>
        <Avatar src={mario} className={classes.avatar} />

      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;
