import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Register from './pages/Register/Register';
import PostPage from './pages/PostPage/PostPage';

export const router = createBrowserRouter([
    { path: '/', element: <SignIn /> },
    { path: '/register', element: <Register /> },
    { path: '/post', element: <PostPage /> }
]);
