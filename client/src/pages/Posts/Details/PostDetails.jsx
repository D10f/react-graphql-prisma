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
    <QueryResult data={data} error={error} loading={loading} >
      <Container>
        <Typography
          variant="h2"
          component="h2"
        >
          <p>Hello</p>
        </Typography>

        <Typography
        >
          <p>Natus voluptatem sed sit temporibus aliquam itaque et doloribus et. Necessitatibus est eum voluptatem autem facilis ut.</p>
        </Typography>
      </Container>
    </QueryResult>
  );
};

export default PostDetails;
