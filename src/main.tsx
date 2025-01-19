import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PostPage from './pages/PostPage/PostPage';
// import { UserContext } from './Contexts/UserContext';
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <UserContext.Provider > */}
            <PostPage />
        {/* </UserContext.Provider> */}
    </StrictMode>
);
