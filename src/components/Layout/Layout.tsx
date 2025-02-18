import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../api/auth/use.auth";
import { Box } from "@mui/material";
import { createRouter } from "../../router";
import { withStyles, WithStyles } from '@mui/styles';
import { styles } from "./styles";

interface LayoutProps extends WithStyles<typeof styles>{
    setUserId: Dispatch<SetStateAction<string>>
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const {setUserId, classes} = props;
    const navigate = useNavigate();
    
    const { setToken: setAccessToken } = useAuth(navigate);

    return (
        <Box className={classes.root}>
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