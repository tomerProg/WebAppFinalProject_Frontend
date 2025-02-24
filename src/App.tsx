import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AlertSnackbarProvider } from './components/AlertSnackbar/globalProvider';

import FixersAppBar from './components/FixersAppBar/FixersAppBar';
import Layout from './components/Layout/Layout';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        },
        background: {
            default: 'white'
        }
    }
});

const App: FunctionComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <AlertSnackbarProvider>
                <BrowserRouter>
                    <CssBaseline />
                    <FixersAppBar />
                    <Layout />
                </BrowserRouter>
            </AlertSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
