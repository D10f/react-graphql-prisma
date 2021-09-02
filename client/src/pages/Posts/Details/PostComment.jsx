import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import padiColorMapper from '@utils/padiColorMapper';
import { PADI_CERTS } from '@enums';

const useStyles = makeStyles(theme => ({
  avatar: {
    boxShadow: theme.shadows[1],
    background: padiColorMapper
  },
  commentCard: {
    margin: '1rem 0',
    '&:last-child': {
      marginBottom: '4rem'
    }
  },
  commentContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1rem'
  },
  commentAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingLeft: 0,
  }
}));

const PostComment = ({ author, text }) => {

  const { username, certification } = author;

  const classes = useStyles({ certification: PADI_CERTS[certification] });

  return (
    <Card className={classes.commentCard}>
      <CardContent className={classes.commentContent}>
        <Container className={classes.commentAuthor}>
          <Avatar
            src="./image-fake.jpg"
            alt={author.username}
            className={classes.avatar}
          />
          <Typography variant="subtitle2" component="span">
            {author.username}
          </Typography>
        </Container>

        <Typography>
          {text}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default PostComment;
