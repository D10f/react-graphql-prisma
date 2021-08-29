import { makeStyles } from '@material-ui/core';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  page: {
    background: '#f9f9f9',
    width: '100vw',
    minHeight: '100vh',
    paddingTop: 20
  },
  toolbarOffset: theme.mixins.toolbar
}));

const Layout = ({ children }) => {

  const { root, page, toolbarOffset } = useStyles();

  return (
    <div className={root}>
      <Topbar />
      <Sidebar />
      <main className={page}>
        <div className={toolbarOffset}></div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
