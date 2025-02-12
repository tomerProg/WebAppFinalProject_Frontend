import { Dispatch, SetStateAction } from 'react';
import PostPage from './pages/PostPage/PostPage';
import PostsList from './pages/PostsList/PostsList';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

export const createRouter = (
    setUserId: Dispatch<SetStateAction<string>>,
    setAccessToken: Dispatch<SetStateAction<string | null>>
) => [
    {
        path: '/',
        element: (
            <SignIn setUserId={setUserId} setAccessToken={setAccessToken} />
        )
    },
    {
        path: '/register',
        element: (
            <Register setUserId={setUserId} setAccessToken={setAccessToken} />
        )
    },
    { path: '/profile', element: <UserProfilePage /> },
    { path: '/posts', element: <PostsList /> },
    { path: '/post', element: <PostPage /> }
];
