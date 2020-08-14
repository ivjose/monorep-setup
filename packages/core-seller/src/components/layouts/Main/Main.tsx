import React, { ReactNode } from 'react';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';

import { useAuth } from '@contexts/AuthContext';

import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';

import { useStyles } from './styles';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Main: React.FC<Props> = ({ children, title = 'Sample Title' }) => {
  const classes = useStyles();
  const { setAuthenticated } = useAuth();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = (): void => {
    setAuthenticated(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <HeaderBar
          handleDrawerOpen={handleDrawerOpen}
          title={title}
          open={open}
          handleLogout={handleLogout}
        />
      </AppBar>
      <SideBar
        handleDrawerClose={handleDrawerClose}
        open={open}
        handleLogout={handleLogout}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Main;
