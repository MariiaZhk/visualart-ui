import React from 'react';
import SnackbarMUI from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const severityVariants = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

const Snackbar = ({
  open,
  message,
  onClose,
  severity = severityVariants.success,
  autoHideDuration = 3000,
  vertical = 'bottom',
  horizontal = 'right',
}) => {
  return (
    <SnackbarMUI
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }} variant='filled'>
        {message}
      </Alert>
    </SnackbarMUI>
  );
};

export default Snackbar;
