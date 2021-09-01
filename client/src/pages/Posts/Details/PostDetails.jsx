import { useQuery } from '@apollo/client';
import { postDetailsVar } from '@services/apollo/cache';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import QueryResult from '@components/QueryResult';

import { GET_POST_DETAILS } from '@services/posts/queries';

const PostDetails = ({ match }) => {

  const { data, loading, error } = useQuery(GET_POST_DETAILS, {
    variables: { id: match.params.id }
  });

  return (
    <QueryResult error={error} loading={loading} >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
        >
          <p>{data?.getPostDetails.title}</p>
        </Typography>

        <Typography
        >
          <p>{data?.getPostDetails.body}</p>
        </Typography>
      </Container>
    </QueryResult>
  );
};

export default PostDetails;
