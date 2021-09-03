import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useQuery, useLazyQuery, useReactiveVar } from '@apollo/client';
import mapLocationToProps from '@utils/mapLocationToProps';
import InfiniteScroll from '@components/InfiniteScroll';
import Grid from './Grid';

import { PER_PAGE } from '@constants';

/**
 * Queries the server and retrieves posts data to be displayed as a feed.
 * The graphql query string and cache are based on the current route.
 */
const Feed = () => {

  const location = useLocation();
  const { cache, query } = mapLocationToProps(location);

  const postsInCache = useReactiveVar(cache);

  // The name of the query value, varies depending on the query string used to fetch data
  const queryName = query.definitions[0].name.value;

  // const { data, loading, error, fetchMore } = useQuery(query, {
  const [ startQuery, { data, loading, error, called }] = useLazyQuery(query, {
    onCompleted: (responseData) => {

      const newUniqueValues = responseData[queryName].filter(post => {
        return !postsInCache.some(cachedPost => cachedPost.id === post.id);
      });

      cache([
        ...postsInCache,
        ...newUniqueValues
      ]);
    }
  });

  // Make initial server request
  useEffect(() => {
    startQuery({ variables: { limit: PER_PAGE, skip: postsInCache.length }, fetchPolicy: 'network-only' });
  }, []);

  return (
    <InfiniteScroll
      nextItems={data && data[queryName]}
      fetchNext={() => {
        startQuery({ variables: { limit: PER_PAGE, skip: postsInCache.length }});
      }}
      loading={loading}
      error={error}
    >
      <Grid items={postsInCache} />
    </InfiniteScroll>
  );
};

export default Feed;
