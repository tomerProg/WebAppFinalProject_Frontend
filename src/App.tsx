import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AlertSnackbarProvider } from './components/AlertSnackbar/globalProvider';
import { UserIdContext } from './Contexts/UserIdContext/UserContext';

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
    const [userId, setUserId] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <AlertSnackbarProvider>
                <UserIdContext.Provider value={userId}>
                    <BrowserRouter>
                        <CssBaseline />
                        <FixersAppBar />
                        <Layout setUserId={setUserId} />
                    </BrowserRouter>
                </UserIdContext.Provider>
            </AlertSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
