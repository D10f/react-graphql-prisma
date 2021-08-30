import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const DRAWER_WIDTH  = 250;
export const WEBAPP_NAME   = 'Dive Mapper';

export const PER_PAGE = 10;

export const SIDEBAR_ITEMS = [
  {
    text: 'Public',
    icon: <PublicOutlinedIcon color="primary" />,
    path: '/'
  },
  {
    text: 'Feed',
    icon: <BookmarkBorderOutlinedIcon color="primary" />,
    path: '/feed'
  },
  {
    text: 'Favorites',
    icon: <FavoriteBorderIcon color="primary" />,
    path: '/favorites'
  },
  {
    text: 'My Dives',
    icon: <SubjectOutlined color="primary" />,
    path: '/dashboard'
  },
  {
    text: 'Log New Dive',
    icon: <AddCircleOutlineOutlined color="primary" />,
    path: '/register'
  },
];
