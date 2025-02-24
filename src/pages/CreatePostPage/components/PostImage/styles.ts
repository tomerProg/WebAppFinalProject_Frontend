import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    imageButton: {
        width: '100%',
        height: '90%',
        background: 'whitesmoke',
        borderRadius: '16px',
        border: '1px solid #0000001c',
        cursor: 'pointer',
    },
    postImage: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    },
    hideInput: {
        display: 'none'
    },
    removeImageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '10%'
    }
});
