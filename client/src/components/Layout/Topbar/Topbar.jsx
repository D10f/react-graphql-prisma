import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import mario from '@assets/mario-av.png';

import * as constants from '@constants';

const useStyles = makeStyles({
  appbar: {
    width: `calc(100% - ${constants.DRAWER_WIDTH}px)`
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: '16px'
  }
});

const Sidebar = () => {

  const classes = useStyles();

  return (
    <AppBar elevation={0} className={classes.appbar}>
      <Toolbar>
        <Typography className={classes.grow}>
          { new Date().toISOString() }
        </Typography>
        <Typography className={classes.avatar}>
          Mario
        </Typography>
        <Avatar src={mario} />
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;
