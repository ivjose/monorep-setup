import React, { ReactNode } from 'react';

import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Slide, { SlideProps } from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = ({ direction }: SlideProps) =>
  React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction={direction} ref={ref} {...props} />;
  });

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
  renderAction?: ReactNode;
  direction?: SlideProps;
};

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  handleClose,
  message,
  children,
  renderAction,
  direction,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={direction ? Transition(direction) : undefined}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && (
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      )}

      <DialogContent id="alert-dialog-slide-description">
        {message && <DialogContentText>{message}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>{renderAction}</DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
