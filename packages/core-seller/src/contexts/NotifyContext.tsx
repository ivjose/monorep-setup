import React, { ReactNode, ReactElement, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
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

  function handleUpdateStatus({ status, message }: UpdateStatus): void {
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
