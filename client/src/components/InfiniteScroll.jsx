import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { DRAWER_WIDTH } from '@constants';
import ServerError from '@components/ServerError';
import EndOfFeed from '@components/EndOfFeed';

const useStyles = makeStyles(theme => {
  return {
    centerContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: `calc(100vh - ${DRAWER_WIDTH}px)`,
      margin: '5rem 0'
    },
    illustration: {
      width: '25rem',
      height: '25rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(4),
      fontFamily: theme.typography.subtitle1.fontFamily,
      fontSize: theme.typography.subtitle1.fontSize,
      [theme.breakpoints.down('sm')]: {
        width: '15rem',
        height: '25rem',
      }
    }
  }
});

/**
 * Uses IntersectionObserver API to trigger a callback function when a DOM element moves into view
 * Credit: https://www.youtube.com/watch?v=GVDiw3lAyp0
 */
const InfiniteScroll = ({ children, fetchNext, nextItems, loading, error }) => {

  const { centerContent, illustration } = useStyles();

  // 1. useRef returns an object whose in-memory reference will stay constant throughout re-renders
  const fetchNextRef = useRef(fetchNext);

  // 2. overwrite fetchNextRef.current to the function received to fetch new data, since it
  // changes on every re-render.
  useEffect(() => {
    fetchNextRef.current = fetchNext;
  }, [ fetchNext ]);

  // 3. The intersection observer uses the initial reference and invoke's the current propery, that
  // has just been updated to the latest fn reference
  const observer = useRef(new IntersectionObserver(([ entry ]) => {
    if (entry.isIntersecting) {
      fetchNextRef.current();
    }
  }, { threshold: 0.6 }));

  // 4. Same logic as above (keep references up to date) but with a DOM element.
  const [ targetElement, setTargetElement ] = useState(null);

  useEffect(() => {
    const currentElement = targetElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [ targetElement ]);

  return (
    <>
      {children}
      <div ref={setTargetElement} className={centerContent}>
        { loading && <CircularProgress /> }

        { error && (
          <div className={illustration}>
            <ServerError />
            <p>{error.message}</p>
          </div>
        )}

        { nextItems && nextItems?.length === 0 && (
          <div className={illustration}>
            <EndOfFeed />
            <p>You have reached the end!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default InfiniteScroll;
