import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId='591810062000-bc5che2sbm6kht5f1lme2i4s92k2maes.apps.googleusercontent.com'>
        <StrictMode>
            <App />
        </StrictMode>
    </GoogleOAuthProvider>
);
