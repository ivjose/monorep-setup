import React, { ReactNode, ReactElement, useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Alert from '@components/common/Alert';

type Status = 'error' | 'success' | 'info' | 'warning' | undefined;

type NotifyContext = {
  status?: Status;
  message?: string | undefined;

  setUpdateStatus: (T: UpdateStatus) => void;
};

type UpdateStatus = {
  status?: Status;
  message?: string | undefined;
  position?: SnackbarOrigin;
};

const NotifyContext = React.createContext<NotifyContext>({
  status: undefined,
  message: '',
  setUpdateStatus: () => {},
});

export const NotifyProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [openNotify, setOpenNotify] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(undefined);
  const [message, setMessage] = useState<string | undefined>('');
  const [position, setPosition] = useState<SnackbarOrigin>({
    vertical: 'top',
    horizontal: 'center',
  });

  function handleUpdateStatus({
    status,
    message,
    position,
  }: UpdateStatus): void {
    if (position) {
      position && setPosition(position);
    }

    setStatus(status);
    setMessage(message);
    setOpenNotify(true);
  }

  function handleClose() {
    setOpenNotify(false);
  }

  return (
    <NotifyContext.Provider
      value={{
        status,
        message,
        setUpdateStatus: handleUpdateStatus,
      }}
    >
      <Snackbar
        open={openNotify}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={position}
      >
        <Alert onClose={handleClose} severity={status}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </NotifyContext.Provider>
  );
};

export function useNotifyProvider(): NotifyContext {
  const context = React.useContext(NotifyContext);
  if (context === undefined) {
    throw new Error('useNotifyProvider must be used within an NotifyProvider');
  }
  return context;
}
