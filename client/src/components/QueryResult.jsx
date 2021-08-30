import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

import { DRAWER_WIDTH } from '@constants';

const useStyles = makeStyles({
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: `calc(100vh - ${DRAWER_WIDTH}px)`,
  },
  mb: {
    marginBottom: 25
  }
});

const MutationResult = ({ error, loading, data, children }) => {

  const { centerContent, mb } = useStyles();

  if (loading) {
    return (
      <div className={centerContent}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Alert onClose={() => {}} className={mb} severity="error" >
          {error.message === 'User Input Validation Error'
            ? error.graphQLErrors.map(gqlError => gqlError.extensions.errors.map(err => err.message))
            : error.message
          }
        </Alert>
        {children}
      </>
    );
  }

  return children
};

export default MutationResult;
