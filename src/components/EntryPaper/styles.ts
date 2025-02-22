import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2em',
            [theme.breakpoints.down("sm")]: {
                width: '100%',
            },
            [theme.breakpoints.up("sm")]: {
                width: '90%',
            },
            [theme.breakpoints.up("md")]: {
                width: '70%',
            },
            [theme.breakpoints.up("lg")]: {
                width: '50%',
            }, 
        },
    
}))
