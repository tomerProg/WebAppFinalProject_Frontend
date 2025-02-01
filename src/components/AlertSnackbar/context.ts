import { AlertProps } from '@mui/material';
import { createContext } from 'react';

interface ShowSnackbar {
    showSnackbar: (
        message: string,
        severity?: AlertProps['severity'],
        autoHideDuration?: number
    ) => void;
}

export const SnackbarContext = createContext<ShowSnackbar | null>(null);
