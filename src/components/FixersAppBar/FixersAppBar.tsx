import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../api/users/types';
import { getMyUser } from '../../api/users/users.api';
import { ignoreCanceledRequest } from '../../api/utils';
import { styles } from './styles';
import { createAppbarMenu, isVisibleAppBar } from './utils';

const FixersAppBar: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const [loginUser, setLoginUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isVisible: boolean = useMemo(
        () => isVisibleAppBar(location),
        [location]
    );

    useEffect(() => {
        if (isVisible) {
            const { request, abort } = getMyUser();
            request
                .then(({ data }) => setLoginUser(data))
                .catch(ignoreCanceledRequest);
            return () => abort();
        }
    }, [isVisible, location]);

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
                        <Box
                            className={classes.logo}
                            onClick={() => navigate('/posts')}
                        >
                            <img
                                src='/favicon.svg'
                                alt='icon'
                                className={classes.logoImage}
                            />
                            <Typography variant='h4'>Fixers</Typography>
                        </Box>

                        <IconButton
                            className={classes.avatarButton}
                            onClick={handleMenu}
                        >
                            <Avatar
                                alt={loginUser?.username}
                                src={loginUser?.profileImage}
                            />
                        </IconButton>

                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            keepMounted
                            sx={{ mt: -1 }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {createAppbarMenu(navigate).map(
                                ({ label, onClick }, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            onClick();
                                            handleClose();
                                        }}
                                    >
                                        {label}
                                    </MenuItem>
                                )
                            )}
                        </Menu>
                    </Toolbar>
                </AppBar>
            )}
            <Outlet />
        </>
    );
};

export default withStyles(styles)(FixersAppBar);
