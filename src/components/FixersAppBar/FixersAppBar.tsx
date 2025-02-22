import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import {
    FunctionComponent,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../api/users/types';
import { getUserById } from '../../api/users/users.api';
import { ignoreCanceledRequest } from '../../api/utils';
import { UserIdContext } from '../../Contexts/UserIdContext/UserContext';
import { isVisibleAppBar } from './components/utils';
import { styles } from './styles';

const FixersAppBar: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const userId = useContext(UserIdContext);
    const { classes } = props;
    const [loginUser, setLoginUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isVisible: boolean = useMemo(
        () => isVisibleAppBar(location),
        [location]
    );

    useEffect(() => {
        if (isVisible && userId !== '') {
            const { request, abort } = getUserById(userId);
            request
                .then(({ data }) => setLoginUser(data))
                .catch(ignoreCanceledRequest);
            return () => abort();
        }
    }, [isVisible, userId, location]);

    const handleOpenUserProfile = () => {
        navigate('/profile');
    };

    return (
        <>
            {isVisible && (
                <AppBar
                    position='static'
                    color='default'
                    elevation={1}
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolBar}>
                        <Box className={classes.logo}>
                            <img
                                src='/favicon.svg'
                                alt='icon'
                                className={classes.logoImage}
                            />
                            <Typography variant='h4'>Fixers</Typography>
                        </Box>

                        <IconButton
                            edge='end'
                            className={classes.avatarButton}
                            onClick={handleOpenUserProfile}
                        >
                            <Avatar
                                alt='User Avatar'
                                src={
                                    loginUser
                                        ? loginUser.profileImage
                                        : undefined
                                }
                            />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
            <Outlet />
        </>
    );
};

export default withStyles(styles)(FixersAppBar);
