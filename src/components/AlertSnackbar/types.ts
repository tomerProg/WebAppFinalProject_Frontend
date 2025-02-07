import { AlertProps } from '@mui/material';

export type SnackbarDetails = {
    open: boolean;
    message: string;
    severity: AlertProps['severity'];
    autoHideDuration?: number;
};
