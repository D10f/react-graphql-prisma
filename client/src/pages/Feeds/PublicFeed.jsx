import { useState, useEffect } from 'react';
import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';

import Grid from '@components/Grid';
import InfiniteScroll from '@components/InfiniteScroll';

import { publicFeedVar } from '@services/cache';
import { PER_PAGE } from '@constants';

export const GET_PUBLIC_POSTS = gql`
  query getPublicFeed($limit: Int, $skip: Int) {
    postsForPublicFeed(limit: $limit, skip: $skip) {
      id
      title
      body
      createdAt
      commentCount
      likeCount
      author {
        id
        username
      }
    }
  }
`;

const PublicFeed = () => {

  const publicFeedPosts = useReactiveVar(publicFeedVar);

  const somevar = 'postsForPublicFeed';
  const [ currentPage, setCurrentPage ] = useState(0);

  const [ fetchPublicFeed, { data, loading, error }] = useLazyQuery(GET_PUBLIC_POSTS, {
    variables: { limit: PER_PAGE, skip: currentPage },
    onCompleted: ({ postsForPublicFeed }) => publicFeedVar([
      ...publicFeedVar(),
      ...postsForPublicFeed
    ])
  });

  useEffect(fetchPublicFeed, []);

  return (
    <InfiniteScroll
      items={publicFeedPosts}
      fetchNext={() => setCurrentPage(prev => prev + PER_PAGE)}
      nextItems={data ? data[somevar] : []}
      loading={loading}
      error={error}
    >
      <Grid items={publicFeedPosts} />
    </InfiniteScroll>
  );
};

export default PublicFeed;
