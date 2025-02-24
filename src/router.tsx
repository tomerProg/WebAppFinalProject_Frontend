import { SetAccessTokenFunction } from './api/auth/types';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import PostPage from './pages/PostPage/PostPage';
import PostsList from './pages/PostsList/PostsList';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

export const createRouter = (setAccessToken: SetAccessTokenFunction) => [
    {
        path: '/',
        element: <SignIn setAccessToken={setAccessToken} />
    },
    {
        path: '/register',
        element: <Register setAccessToken={setAccessToken} />
    },
    { path: '/profile', element: <UserProfilePage /> },
    { path: '/posts', element: <PostsList /> },
    { path: '/post', element: <PostPage /> },
    { path: '/createPost', element: <CreatePostPage /> }
];
