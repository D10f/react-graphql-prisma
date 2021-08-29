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
  }
});

const QueryResult = ({ error, loading, data, children }) => {

  const { centerContent } = useStyles();

  if (loading) {
    return (
      <div className={centerContent}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={centerContent}>
        <p>ERROR: {error.message}</p>;
      </div>
    );
  }

  if (!data) {
    return (
      <div className={centerContent}>
        <p>No records available</p>
      </div>
    );
  }

  return children;
};

export default QueryResult;
