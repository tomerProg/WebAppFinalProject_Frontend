import { Alert, AlertProps, Snackbar } from '@mui/material';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { SnackbarContext } from './context';
import { SnackbarDetails } from './types';

const defaultAutoHideDuration = 3000;

export const AlertSnackbarProvider: React.FC<PropsWithChildren> = ({
    children
}) => {
    const [snackbar, setSnackbar] = useState<SnackbarDetails>({
        open: false,
        message: '',
        severity: 'error',
        autoHideDuration: defaultAutoHideDuration
    });

    const showSnackbar = (
        message: string,
        severity: AlertProps['severity'] = 'error',
        autoHideDuration: number = defaultAutoHideDuration
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
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={snackbar.autoHideDuration}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useAlertSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
