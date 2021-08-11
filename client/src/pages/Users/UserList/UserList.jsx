import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';
import UserCard from '../UserCard/UserCard';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
};

const UserList = ({ users }) => {
  return (
    <div>
      {users.length > 0 && (
        <Container>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {users.map(user => (
              <div key={Math.random()}>
                <UserCard user={user} />
              </div>
            ))}
          </Masonry>
        </Container>
      )}
    </div>
  );
};

// Replaced by Masonry
// import Grid from '@material-ui/core/Grid';
// <Grid container spacing={2}>
//   {users.map(user => (
//     <Grid item xs={12} md={6} lg={4} key={Math.random()}>
//       <UserCard user={user} />
//     </Grid>
//   ))}
// </Grid>

export default UserList;
