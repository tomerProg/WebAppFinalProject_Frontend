import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    actionsSection: {
        maxHeight: '10%',
        // width: '100%',
        // display: 'flex',
        // justifyContent: 'center',
        // margin: '4px'
    },
    imagePreview: {
        width: '100%',
        height: '90%',
        background: 'whitesmoke',
        borderRadius: '16px',
        border: '1px solid #0000001c',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    imagePreviewText: {
        width: '100%',
        textAlign: 'center',
        userSelect: 'none'
    },
    postImage: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    },
    hideInput: {
        display: 'none'
    }
});
