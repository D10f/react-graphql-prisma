import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CardItem from '@components/CardItem';
import Masonry from 'react-masonry-css';

import { authenticationVar } from '@services/apollo/cache';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
};

const useStyles = makeStyles({
  fullHeight: {
    minHeight: (items) => items ? '100vh' : '0vh'
  }
});

const Grid = ({ items }) => {

  const classes = useStyles({ items: items.length });
  const loggedInAs = authenticationVar()?.id;

  return (
    <Container className={classes.fullHeight}>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map(item => (
          <CardItem key={item.id} loggedInAs={loggedInAs} {...item} />
        ))}
      </Masonry>
    </Container>
  );
};

export default Grid;
