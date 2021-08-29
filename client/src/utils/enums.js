import pink from '@material-ui/core/colors/pink';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

export const PADI_CERTS = {
  OPEN_WATER: 'Open Water Diver',
  ADVANCED: 'Advanced Diver',
  RESCUE: 'Rescue Diver',
  DIVEMASTER: 'Divemaster'
};

/* Colors used to for users with missing avatars */
export const PADI_COLORS = {
  OPEN_WATER: blue[500],
  ADVANCED: pink[500],
  RESCUE: amber[500],
  DIVEMASTER: amber[500]
};

/* Each route maps to a title which is displayed at the top bar */
export const ROUTE_TITLES = {
  '/'         : 'Your Friend\'s Dive Logs',
  '/feed'     : 'Latest Public Dive Logs',
  '/favorites': 'Your Favorite Dive Logs',
  '/dashboard': 'Dashboard',
  '/register' : 'Sign Up For A New Account',
  '/login'    : 'Log Back In'
};
