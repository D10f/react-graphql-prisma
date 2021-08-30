import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import padiColorMapper from '@utils/padiColorMapper';
import { PADI_CERTS } from '@enums';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: padiColorMapper
  },
  counter: {
    fontSize: '1rem',
    marginLeft: 10
  }
});

const CardItem = ({ id, title, body, commentCount, likeCount, likedBy, author, loggedInAs }) => {

  const { username } = author;
  const classes = useStyles({ certification: PADI_CERTS.OPEN_WATER });

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
        title={title}
        subheader={username}
      />

      <CardContent>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
        >
          {body}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            color={likedBy.id === loggedInAs ? "primary" : ""}
          />
        </IconButton>
        <span className={classes.counter}>{likeCount}</span>
        <IconButton aria-label="share">
          <QuestionAnswerIcon />
        </IconButton>
        <span className={classes.counter}>{commentCount}</span>
      </CardActions>
    </Card>
  );
};

export default CardItem;
