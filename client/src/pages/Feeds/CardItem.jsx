import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import padiColorMapper from '@utils/padiColorMapper';
import { PADI_CERTS } from '@enums';
import {
  UNLIKE_POST_TOOLTIP,
  LIKE_POST_TOOLTIP,
  FIRST_COMMENT_POST_TOOLTIP,
  COMMENT_POST_TOOLTIP,
  EDIT_POST_TOOLTIP,
} from '@constants';

const useStyles = makeStyles(theme => {
  // console.log(theme)
  return {
    avatar: {
      background: padiColorMapper,
      boxShadow: theme.shadows[1]
    },
    counter: {
      fontSize: '0.8rem',
      fontFamily: 'Sans-serif',
      color: '#757575',
      marginLeft: 10
    },
    pushRight: {
      marginLeft: 'auto !important'
    },
    link: {
      color: theme.palette.grey['A400'],
      textDecoration: 'none',
      fontSize: theme.typography.subtitle1.fontSize,
      '&:hover': {
        color: theme.palette.primary.main,
      }
    }
  }
});

const CardItem = ({
  id,
  title,
  excerpt,
  commentCount,
  likeCount,
  likedBy,
  author,
  loggedInAs,
  giveALike,
}) => {

  const history = useHistory();

  // const { id: authorId, username, certification } = author;
  const classes = useStyles({ certification: PADI_CERTS[author?.certification] });
  const likesThisPost = likedBy?.some(user => user.id === loggedInAs);

  if (!author) return null;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {author?.username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Link className={classes.link} to={`/trek/${id}`}>{title}</Link>
        }
        subheader={author?.username}
      />

      <CardContent>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
        >
          {excerpt}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip
          title={likesThisPost ? UNLIKE_POST_TOOLTIP : LIKE_POST_TOOLTIP}
        >
          <IconButton aria-label="add to favorites" onClick={() => giveALike(id)}>
            <FavoriteIcon
              color={likesThisPost ? "primary" : "action"}
            />
          </IconButton>
        </Tooltip>
        <span className={classes.counter}>{likeCount}</span>

        <Tooltip title={commentCount === 0 ? FIRST_COMMENT_POST_TOOLTIP : COMMENT_POST_TOOLTIP}>
          <IconButton aria-label="share">
            <QuestionAnswerIcon />
          </IconButton>
        </Tooltip>
        <span className={classes.counter}>{commentCount}</span>

        {loggedInAs === author?.id && (
          <Tooltip title={EDIT_POST_TOOLTIP}>
            <IconButton
              className={classes.pushRight}
              aria-label="edit this post"
              onClick={() => history.push(`/edit-trek/${id}`)}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default React.memo(CardItem);
