import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Icon} from '@mui/material';
import { User } from '../../api/users/types';
import { getUserById } from '../../api/users/users.api';
import { ignoreCanceledRequest } from '../../api/utils';
import { withStyles, WithStyles } from '@mui/styles';
import { styles } from './styles';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserIdContext } from '../../Contexts/UserIdContext/UserContext';

const FixersAppBar: FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const userId = useContext(UserIdContext);  
  const { classes } = props;
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
          const { request, abort } = getUserById(userId);
          request
              .then(({ data }) => setLoginUser(data))
              .catch(ignoreCanceledRequest);
          return () => abort();
  }, [userId, location]);

  const handleOpenUserProfile = () => {
    const {pathname} = location;
    if (pathname !== '/' && pathname !=='/register'){
      navigate('/profile');
    }
    
  }

  return (
    <>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box className={classes.leftBox}>          
          <Icon sx={{height: "4rem", width: "3rem"}} >
            <img src="/favicon.svg" alt="icon" width={50} height={50}/>
          </Icon>
          <Typography variant="h4">Fixers</Typography>
        </Box>
        <Box className={classes.middleBox}/>                    
        <Box >          
          <IconButton edge="end" className={classes.avatarButton} onClick={handleOpenUserProfile}>
            <Avatar alt="User Avatar" sx={{width: '100%', height: '100%'}} 
              src={loginUser ? loginUser.profileImageUrl : undefined} />
          </IconButton>
        </Box>        
      </Toolbar>
    </AppBar>
    <Outlet />
    </>
  );
};

export default withStyles(styles)(FixersAppBar);