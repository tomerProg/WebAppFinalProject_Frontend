import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Register from './pages/Register/Register';
import PostsList from './pages/PostsList/PostsList';

export const router = createBrowserRouter([
    { path: '/', element: <SignIn /> },
    { path: '/register', element: <Register /> },
    { path: '/posts', element: <PostsList /> }
]);
