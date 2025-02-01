import { Dispatch, SetStateAction } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PostPage from './pages/PostPage/PostPage';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';

export const createRouter = (setUserId: Dispatch<SetStateAction<string>>) =>
    createBrowserRouter([
        { path: '/', element: <SignIn setUserId={setUserId} /> },
        { path: '/register', element: <Register setUserId={setUserId} /> },
        { path: '/post', element: <PostPage /> }
    ]);
