import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import {
    UserIdContext
} from './Contexts/UserIdContext/UserContext';
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

const App: React.FC = () => {
    const [userId, setUserId] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <UserIdContext.Provider value={userId}>
                <CssBaseline />
                <RouterProvider router={createRouter(setUserId)} />
            </UserIdContext.Provider>
        </ThemeProvider>
    );
};

export default App;
