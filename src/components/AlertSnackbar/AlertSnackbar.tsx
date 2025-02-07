import { Alert, AlertProps, Snackbar } from '@mui/material';
import React from 'react';

const defaultAutoHideDuration = 3000;

interface AlertSnackbar {
    open: boolean;
    message?: string;
    severity?: AlertProps['severity'];
    autoHideDuration?: number;
    onSnackbarClose: () => void;
}

export const AlertSnackbar: React.FC<AlertSnackbar> = (props) => {
    const {
        open,
        autoHideDuration = defaultAutoHideDuration,
        severity,
        message,
        onSnackbarClose
    } = props;

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onSnackbarClose}
        >
            <Alert onClose={onSnackbarClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
