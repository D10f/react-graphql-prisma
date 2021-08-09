import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

import pink from '@material-ui/core/colors/pink';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import { PADI_CERTS } from '@enums';

const colorInterpolation = ({ certification }) => {
  switch (certification) {
    case PADI_CERTS.OPEN_WATER:
      return blue[500];
    case PADI_CERTS.ADVANCED:
      return pink[500];
    case PADI_CERTS.RESCUE:
      return green[500];
    case PADI_CERTS.DIVEMASTER:
      return amber[500];
    default:
      return amber[500];
  }
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: colorInterpolation
  }
});

const UserCard = ({ user: { username, handle, certification, quote } }) => {

  const classes = useStyles({ certification });

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton>
            <DeleteOutlined/>
          </IconButton>
        }
        title={username}
        subheader={handle}
      />

      <CardContent>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
        >
          {quote}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
