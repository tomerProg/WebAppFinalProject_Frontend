import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        padding: '4px',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        boxSizing: 'border-box'
    },
    ownComment: {
        flexDirection: 'row-reverse'
    },
    commentContent: {
        padding: '4px',
        margin: '4px',
        maxWidth: '90%',
        minWidth: '30%'
    }
});
