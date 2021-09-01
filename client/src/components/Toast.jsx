import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { DRAWER_WIDTH } from '@constants';

const useStyles = makeStyles(theme => ({
  // Overwrite default styles to account for the left hand side drawer space
  anchorOriginTopCenter: {
    top: 8,
    left: `calc(50% + ${DRAWER_WIDTH}px)`,
    right: 'auto',
    transform: 'translateX(-100%)',
    [theme.breakpoints.up('sm')]: {
      top: 24
    },
  }
}));

const Toast = ({ message, onClose, severity = 'error' }) => {

  const { anchorOriginTopCenter } = useStyles();

  return (
    <Snackbar
      classes={{ anchorOriginTopCenter }}
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
