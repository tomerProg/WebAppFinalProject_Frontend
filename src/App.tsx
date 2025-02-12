import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './api/auth/use.auth';
import { AlertSnackbarProvider } from './components/AlertSnackbar/globalProvider';
import { UserIdContext } from './Contexts/UserIdContext/UserContext';
import { createRouter } from './router';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        },
        background: {
            default: '#f5f5f5'
        }
    }
});

const Layout: FunctionComponent = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const { setToken: setAccessToken } = useAuth(navigate);

    return (
        <UserIdContext.Provider value={userId}>
            <Routes>
                {createRouter(setUserId, setAccessToken).map(
                    ({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    )
                )}
            </Routes>
        </UserIdContext.Provider>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <AlertSnackbarProvider>
                <BrowserRouter>
                    <CssBaseline />
                    <Layout />
                </BrowserRouter>
            </AlertSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
