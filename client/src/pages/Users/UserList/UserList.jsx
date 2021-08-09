import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import UserCard from '../UserCard/UserCard';

const UserList = ({ users }) => {
  return (
    <div>
      {users.length > 0 && (
        <Container>
          <Grid container spacing={2}>
            {users.map(user => (
              <Grid item xs={12} md={6} lg={4} key={Math.random()}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default UserList;
