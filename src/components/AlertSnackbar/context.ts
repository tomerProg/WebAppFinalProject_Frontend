import { AlertProps } from '@mui/material';
import { createContext } from 'react';

interface ShowAlertSnackbar {
    showSnackbar: (
        message: string,
        severity?: AlertProps['severity'],
        autoHideDuration?: number
    ) => void;
}

export const alertSnackbarContext = createContext<ShowAlertSnackbar | null>(null);
