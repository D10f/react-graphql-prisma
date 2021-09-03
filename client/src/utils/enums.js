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
  OPEN_WATER: `linear-gradient(to top right, ${blue[500]}, ${blue[200]})`,
  ADVANCED: `linear-gradient(to top right, ${pink[500]}, ${pink[100]})`,
  RESCUE: `linear-gradient(to top right, ${amber[700]}, ${amber[200]})`,
  DIVEMASTER: `linear-gradient(to top right, ${green[700]}, ${green[100]})`
  // OPEN_WATER: blue[500],
  // ADVANCED: pink[500],
  // RESCUE: amber[500],
  // DIVEMASTER: amber[500]
};

/* Each route maps to a title which is displayed at the top bar */
export const ROUTE_TITLES = {
  '/'          : 'What People Have Been Up To',
  '/favorites' : 'Your All Time Favorites',
  '/dashboard' : 'See How Far You\'ve come',
  '/register'  : 'Sign Up For A New Account',
  '/login'     : 'Welcome Back!',
  '/new-trek'  : 'Add A New Adventure Log',
  '/edit-trek' : 'Editing Log'
};
