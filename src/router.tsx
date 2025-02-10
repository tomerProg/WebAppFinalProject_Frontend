import { Dispatch, SetStateAction } from 'react';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import PostPage from './pages/PostPage/PostPage';
import PostsList from './pages/PostsList/PostsList';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import FixersAppBar from './components/FixersAppBar/FixersAppBar';

export const createRouter = (setUserId: Dispatch<SetStateAction<string>>) =>
    createBrowserRouter(
        [{
            path: '/', element: <FixersAppBar />,
            children: [
                { path: '/', element: <SignIn setUserId={setUserId} /> },
                { path: '/register', element: <Register setUserId={setUserId} /> },
                { path: '/profile', element: <UserProfilePage /> },
                { path: '/posts', element: <PostsList /> },
                { path: '/post', element: <PostPage /> }
            ]
    }]);
    
