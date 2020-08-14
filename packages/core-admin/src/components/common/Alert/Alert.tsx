import React, { ReactNode } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styles';

interface ExternalProps {
  action?: () => void;
  title?: string;
  children: ReactNode;
}

type Props = AlertProps & ExternalProps;

const Alert: React.FC<Props> = ({ action, title, children, ...props }) => {
  const classes = useStyles();

  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      className={classes.root}
      {...props}
      action={
        action && (
          <IconButton
            aria-label="close"
            color="inherit"
            //   className={classes.close}
            onClick={action}
          >
            <CloseIcon />
          </IconButton>
        )
      }
    >
      {title && <AlertTitle>{`${title.toUpperCase()}`}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};

export default Alert;
