import CircularProgress from '@material-ui/core/CircularProgress';
import Toast from '@components/Toast';
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
  // mb: {
  //   marginBottom: 25
  // },
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
    return <Toast message={error.message} severity='error' onClose={() => {}} />
  }

  return children;
};

export default QueryResult;
