import { PAGES_ROUTES } from '../../../routes/routes.const';

export const isVisibleAppBar = ({ pathname }: { pathname: string }): boolean =>
    pathname !== PAGES_ROUTES.LOGIN && pathname !== PAGES_ROUTES.REGISTER;
