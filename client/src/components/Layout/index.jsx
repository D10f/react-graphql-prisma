import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Sidebar from './Sidebar';
import Topbar from './Topbar/Topbar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  page: {
    background: '#f9f9f9',
    width: '100vw',
    minHeight: '100vh',
    paddingTop: theme.spacing(2),
  },
  toolbarOffset: theme.mixins.toolbar,
  mainSpace: {
    maxWidth: '1024px',
    margin: '1rem auto'
  }
}));

const Layout = ({ children }) => {

  const { root, page, toolbarOffset, mainSpace } = useStyles();
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <div className={root}>
      <Topbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={page}>
        <div className={toolbarOffset}></div>
        <div className={mainSpace}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
