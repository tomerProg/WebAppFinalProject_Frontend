import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    mainBox: {
        height: '50%',
        background: 'whitesmoke',
        borderRadius: '16px',
        border: '1px solid #0000001c',
    },
    imageButton: {
        width: '100%', 
        height: '100%', 
    },
    postImage: {
        height: '100%',
        objectFit: 'contain',
        
    },
    hideInput: {
        clip: 'rect(0 0 0 0)', 
        position: 'absolute'
    },
}));
