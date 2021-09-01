import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

  const [ currentPage, setCurrentPage ] = useState(0);

  // The name of the query value, varies depending on the query string used to fetch data
  const queryName = query.definitions[0].name.value;

  // const { data, loading, error, fetchMore, client } = useQuery(query, {
  const [ startQuery, { data, loading, error, client }] = useLazyQuery(query, {
    variables: { limit: PER_PAGE, skip: 0 },
    fetchPolicy: 'network-only',
    // fetchPolicy: 'cache-first',
    onCompleted: (responseData) => cache([
      ...postsInCache,
      ...responseData[queryName]
    ])
  });

  // Make initial server request
  useEffect(startQuery, []);

  // fetchNext: Increasing currentPage triggers a re-render, changes the variables of the query
  // nextItems: Incoming items from the latest query
  // fetchNext={() => setCurrentPage(prev => prev + PER_PAGE)}
  return (
    <InfiniteScroll
      nextItems={data && data[queryName]}
      fetchNext={() => startQuery({ variables: { skip: postsInCache.length } })}
      loading={loading}
      error={error}
    >
      <Grid items={postsInCache} />
    </InfiniteScroll>
  );
};

export default Feed;
