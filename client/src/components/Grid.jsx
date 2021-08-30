import Container from '@material-ui/core/Container';
import CardItem from '@components/CardItem';
import Masonry from 'react-masonry-css';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
};

const Grid = ({ items }) => {
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map(item => (
          <CardItem key={item.id} {...item} />
        ))}
      </Masonry>
    </Container>
  );
};

export default Grid;
