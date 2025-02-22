export const isVisibleAppBar = ({ pathname }: { pathname: string }): boolean =>
    pathname !== '/' && pathname !== '/register';
