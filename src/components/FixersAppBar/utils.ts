import { NavigateFunction } from 'react-router-dom';
import { logout } from '../../api/auth/auth-api';

export const isVisibleAppBar = ({ pathname }: { pathname: string }): boolean =>
    pathname !== '/' && pathname !== '/register';

export const createAppbarMenu = (
    navigate: NavigateFunction
): { label: string; onClick: () => void }[] => [
    {
        label: 'Profile',
        onClick: () => {
            navigate('/profile');
        }
    },
    {
        label: 'Sign Out',
        onClick: () => {
            logout().finally(() => navigate('/'));
        }
    }
];
