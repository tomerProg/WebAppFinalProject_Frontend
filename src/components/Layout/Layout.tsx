import { Dispatch, FunctionComponent, SetStateAction, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../api/auth/use.auth";
import { Box } from "@mui/material";
import { createRouter } from "../../router";
import { withStyles, WithStyles } from '@mui/styles';
import { styles } from "./styles";
import { styles as appBarStyles} from '../FixersAppBar/styles'
import { isVisibleAppBar } from "../FixersAppBar/components/utils";

interface LayoutProps extends WithStyles<typeof styles>{
    setUserId: Dispatch<SetStateAction<string>>
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const {setUserId, classes} = props;
    const navigate = useNavigate();
    const location = useLocation();
    
    const { setToken: setAccessToken } = useAuth(navigate);
    
    const visibleAppBar: boolean = useMemo<boolean>(() => isVisibleAppBar(location), [location])

    return (
        <Box sx={{height: visibleAppBar ? '90vh' : '100vh'}}>
            <Routes>
            {createRouter(setUserId, setAccessToken).map(
                ({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                )
            )}
            </Routes>    
        </Box>
        
    );
};

export default withStyles(styles)(Layout);