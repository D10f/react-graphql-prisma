import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '@services/users/queries';
import QueryResult from '@components/QueryResult';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import LatestPosts from './LatestPosts';

import { authenticationVar } from '@services/apollo/cache';
import { selectCertificationColor } from '@utils/selectors';
import { PADI_CERTS } from '@enums';

const useStyles = makeStyles(theme => ({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userImg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 1 min-content',
  },
  avatar: {
    background: ({ certification }) => selectCertificationColor(certification),
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2),
  },
  uploadBtn: {
    width: 'max-content',
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    margin: theme.spacing(3)
  },
  latestPosts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

const ProfilePage = ({ match }) => {

  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { id: match.params.id }
  });

  const classes = useStyles({ certification: PADI_CERTS[data?.getUserProfile.certification] });
  const loggedInAs = authenticationVar();

  return (
    <QueryResult error={error} loading={loading}>
      <Container className={classes.topContainer} maxWidth="md" >

        <Container className={classes.userImg}>
          <Avatar
            className={classes.avatar}
            src={data?.getUserProfile.url}
            alt={data?.getUserProfile.username}
          />

          {(loggedInAs.id === match.params.id || loggedInAs.role === 'ADMIN') && (
            <Button className={classes.uploadBtn} variant="outlined">
              Upload Image
            </Button>
          )}
        </Container>

        <Container className={classes.userinfo}>
          <Typography variant="h3" component="h2" color="primaryText">
            {data?.getUserProfile.username}
          </Typography>

          <Typography variant="subtitle2" component="p" color="secondaryText">
            Joined {data?.getUserProfile.createdAt}
          </Typography>

          <Typography variant="subtitle2" component="p" color="secondaryText">
            Level {data?.getUserProfile.certification}
          </Typography>
        </Container>
      </Container>

      <Divider className={classes.divider}/>

      <LatestPosts authorId={match.params.id} />

    </QueryResult>
  );
};

export default ProfilePage;
