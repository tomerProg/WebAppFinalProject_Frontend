import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

export const router = createBrowserRouter([
    { path: '/', element: <SignIn /> },
    { path: '/register', element: <Register /> },
    { path: '/profile', element: <UserProfilePage /> }
]);
