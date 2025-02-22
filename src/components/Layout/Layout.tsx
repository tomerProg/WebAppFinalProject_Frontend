import { withStyles, WithStyles } from '@mui/styles';
import { Dispatch, FunctionComponent, SetStateAction, useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/auth/use.auth';
import { createRouter } from '../../router';
import { isVisibleAppBar } from '../FixersAppBar/utils';
import { styles } from './styles';

interface LayoutProps extends WithStyles<typeof styles> {
    setUserId: Dispatch<SetStateAction<string>>;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const { setUserId, classes } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const { setAccessToken } = useAuth(navigate);

    const visibleAppBar: boolean = useMemo<boolean>(
        () => isVisibleAppBar(location),
        [location]
    );

    return (
        <div
            className={
                visibleAppBar
                    ? classes.rootWithAppBar
                    : classes.rootWithoutAppBar
            }
        >
            <Routes>
                {createRouter(setUserId, setAccessToken).map(
                    ({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    )
                )}
            </Routes>
        </div>
    );
};

export default withStyles(styles)(Layout);
