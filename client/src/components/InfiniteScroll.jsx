import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const InfiniteScroll = ({ children, fetchNext, nextItems, loading, error }) => {

  const { centerContent } = useStyles();

  const fetchNextRef = useRef(fetchNext);
  const [ targetElement, setTargetElement ] = useState(null);

  useEffect(() => {
    fetchNextRef.current = fetchNext;
  }, [ fetchNext ]);

  useEffect(() => {
    const currentEl = targetElement;

    if (currentEl) {
      observer.current.observe(currentEl);
    }
    return () => {
      if (currentEl) {
        observer.current.unobserve(currentEl);
      }
    };
  }, [ targetElement ]);

  const observer = useRef(new IntersectionObserver(([ entry ]) => {
    if (entry.isIntersecting) {
      fetchNextRef.current();
    }
  }, { threshold: 0.5 }));

  return (
    <>
      {children}
      <div ref={setTargetElement} className={centerContent}>
        { loading && <CircularProgress /> }
        { error && <p>ERROR: {error.message}</p> }
        { nextItems?.length === 0 && <p>End of feed...</p> }
      </div>
    </>
  );
};

// {items.map(item => <CardItem key={item.id} {...item} />)}
export default InfiniteScroll;
