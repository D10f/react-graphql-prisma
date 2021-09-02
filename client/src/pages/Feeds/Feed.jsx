import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useReactiveVar } from '@apollo/client';

import Grid from '@components/Grid';
import InfiniteScroll from '@components/InfiniteScroll';

import { PER_PAGE } from '@constants';

/**
 * Queries the server and retrieves posts data to be displayed as a feed.
 * The graphql query string and cache received as props are based on the current route.
 * @param {function} cache apollo-client's reactive variable instance
 * @param {string}   query graphql query string built using apollo-client's gql
 */
const Feed = ({ cache, query }) => {

  const postsInCache = useReactiveVar(cache);

  // The name of the query value, varies depending on the query string used to fetch data
  const queryName = query.definitions[0].name.value;

  // const { data, loading, error, fetchMore } = useQuery(query, {
  const [ startQuery, { data, loading, error }] = useLazyQuery(query, {
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
      <Grid items={cache()} />
    </InfiniteScroll>
  );
};

export default Feed;
