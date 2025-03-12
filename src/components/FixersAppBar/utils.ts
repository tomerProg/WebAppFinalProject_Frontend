import { NavigateFunction } from 'react-router-dom';
import { logout } from '../../api/auth/auth-api';
import { PAGES_ROUTES } from '../../routes/routes.const';

export const isVisibleAppBar = ({ pathname }: { pathname: string }): boolean =>
    pathname !== PAGES_ROUTES.LOGIN && pathname !== PAGES_ROUTES.REGISTER;

export const createAppbarMenu = (
    navigate: NavigateFunction
): { label: string; onClick: () => void }[] => [
    {
        label: 'Profile',
        onClick: () => {
            navigate(PAGES_ROUTES.PROFILE);
        }
    },
    {
        label: 'Sign Out',
        onClick: () => {
            logout().finally(() => navigate(PAGES_ROUTES.LOGIN));
        }
    }
];
