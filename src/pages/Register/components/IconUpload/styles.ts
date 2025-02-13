import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

    export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    mainBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },    
    iconButton: {
        [theme.breakpoints.down("sm")]: {
            height: '3em',
            width: '3em',
        },
        [theme.breakpoints.up("sm")]: {
            height: '4em',
            width: '4em',
        },
        [theme.breakpoints.up("md")]: {
            height: '5em',
            width: '5em',
        },
        [theme.breakpoints.up("lg")]: {
            height: '6em',
            width: '6em',
        },
        padding: '0'
    },
    selectedAvatar:{
        width: '100%', 
        height: '100%', 
    },
    defaultAvatar: {
        width: '100%', 
        height: '100%',
    },
    selectedImage: {
        width: '100%', 
        height: '100%', 
        objectFit: 'cover'
    },
    cameraIcon: {        
        color: 'rgba(0, 0, 0, 0.5)'
    },
    hideInput: {
        clip: 'rect(0 0 0 0)', 
        position: 'absolute'
    },
}));
