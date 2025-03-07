import { Dispatch, SetStateAction } from 'react';
import { SetAccessTokenFunction } from '../api/auth/types';
import CreatePostPage from '../pages/CreatePostPage/CreatePostPage';
import PostPage from '../pages/PostPage/PostPage';
import PostsList from '../pages/PostsList/PostsList';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage';
import { PAGES_ROUTES } from './routes.const';

export const createRouter = (
    setUserId: Dispatch<SetStateAction<string>>,
    setAccessToken: SetAccessTokenFunction
) => [
    {
        path: PAGES_ROUTES.LOGIN,
        element: (
            <SignIn setUserId={setUserId} setAccessToken={setAccessToken} />
        )
    },
    {
        path: PAGES_ROUTES.REGISTER,
        element: (
            <Register setUserId={setUserId} setAccessToken={setAccessToken} />
        )
    },
    { path: PAGES_ROUTES.PROFILE, element: <UserProfilePage /> },
    { path: PAGES_ROUTES.POSTS_LIST, element: <PostsList /> },
    { path: PAGES_ROUTES.POST, element: <PostPage /> },
    { path: PAGES_ROUTES.CREATE_POST, element: <CreatePostPage /> }
];
