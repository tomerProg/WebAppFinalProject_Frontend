import { AlertProps } from '@mui/material';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { AlertSnackbar } from './AlertSnackbar';
import { alertSnackbarContext } from './context';
import { SnackbarDetails } from './types';

export const AlertSnackbarProvider: React.FC<PropsWithChildren> = ({
    children
}) => {
    const [snackbar, setSnackbar] = useState<SnackbarDetails>({
        open: false,
        message: '',
        severity: 'error'
    });

    const showSnackbar = (
        message: string,
        severity: AlertProps['severity'] = 'error',
        autoHideDuration?: number
    ) => {
        setSnackbar({
            open: true,
            message,
            severity,
            autoHideDuration
        });
    };

    const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

    return (
        <alertSnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <AlertSnackbar {...snackbar} onSnackbarClose={handleClose} />
        </alertSnackbarContext.Provider>
    );
};

export const useAlertSnackbar = () => {
    const context = useContext(alertSnackbarContext);
    return (
        context ?? {
            showSnackbar: (
                message: string,
                severity?: AlertProps['severity'],
                autoHideDuration?: number
            ) => {
                console.error(
                    'try to alert when alert snackbar context is null:',
                    { message, severity, autoHideDuration }
                );
            }
        }
    );
};
