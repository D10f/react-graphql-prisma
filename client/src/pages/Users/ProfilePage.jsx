import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE } from '@services/users/queries';
import { UPLOAD_FILE } from '@services/files/mutations';
import QueryResult from '@components/QueryResult';
import FileUpload from '@components/FileUpload';
import Toast from '@components/Toast';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import ProfilePosts from './ProfilePosts';

import { authenticationVar } from '@services/apollo/cache';
import { selectCertificationColor } from '@utils/selectors';
import { PADI_CERTS } from '@enums';

const useStyles = makeStyles(theme => ({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  userImg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 1 min-content',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  },
  avatar: {
    background: ({ certification }) => selectCertificationColor(certification),
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    }
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

  const [ singleFileUpload ] = useMutation(UPLOAD_FILE, {
    onCompleted: ({ singleFileUpload }) => {
      const { url } = singleFileUpload;

      if (match.params.id !== loggedInAs.id) return;

      authenticationVar({ ...authenticationVar(), url });
      localStorage.setItem('token', JSON.stringify(authenticationVar()));
    },
    onError: err => console.log(err.message),
  });

  const [ submitError, setSubmitError ] = useState(false);

  const classes = useStyles({ certification: PADI_CERTS[data?.getUserProfile.certification] });
  const loggedInAs = authenticationVar();

  const fileHandleChange = file => singleFileUpload({ variables: { id: match.params.id, file }});

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
            <FileUpload
              className={classes.uploadBtn}
              fileHandleChange={fileHandleChange}
              fileHandleError={setSubmitError}
            />
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

      <ProfilePosts authorId={match.params.id} />

      {submitError && (
        <Toast
          message={submitError}
          severity='error'
          onClose={() => setSubmitError('')}
        />
      )}
    </QueryResult>
  );
};

export default ProfilePage;
