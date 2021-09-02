import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

export const DRAWER_WIDTH  = 250;
export const WEBAPP_NAME   = 'Dive Mapper';

export const PER_PAGE = 10;

export const SIDEBAR_ITEMS = [
  {
    text: 'Public',
    icon: <PublicOutlinedIcon color="primary" />,
    path: '/',
    public: true,
    onlyPublic: false
  },
  // {
  //   text: 'Feed',
  //   icon: <BookmarkBorderOutlinedIcon color="primary" />,
  //   path: '/feed',
  //   public: true,
  //   onlyPublic: false
  // },
  {
    text: 'Favorites',
    icon: <FavoriteBorderIcon color="primary" />,
    path: '/favorites',
    public: false,
    onlyPublic: false
  },
  {
    text: 'My Treks',
    icon: <SubjectOutlined color="primary" />,
    path: '/dashboard',
    public: false,
    onlyPublic: false
  },
  {
    text: 'Log New Trek',
    icon: <AddCircleOutlineOutlined color="primary" />,
    path: '/new-trek',
    public: false,
    onlyPublic: false
  },
  {
    text: 'Register',
    icon: <PersonAddOutlinedIcon color="primary" />,
    path: '/register',
    public: true,
    onlyPublic: true
  },
  {
    text: 'Login',
    icon: <LockOpenOutlinedIcon color="primary" />,
    path: '/login',
    public: true,
    onlyPublic: true
  },
];

/* COMMENTS */

export const NO_COMMENTS_YET = 'Be the first one to leave a comment!';

/* TOOLTIPS */

export const IMG_UPLOAD_TOOLTIP = 'Allowed image files of up to 1MB and 1200x800 pixels';
export const PUBLISH_POST_TOOLTIP = 'Public posts are visible to everyone';
export const ALLOW_COMMENTS_TOOLTIP = "Disable if you don't want to have comments for this post";
export const LIKE_POST_TOOLTIP = 'Give this post a like!';
export const UNLIKE_POST_TOOLTIP = 'Unlike this post';
export const FIRST_COMMENT_POST_TOOLTIP = 'Be the first to leave a comment!';
export const COMMENT_POST_TOOLTIP = 'Leave a comment';
export const EDIT_POST_TOOLTIP = 'Edit this post';
