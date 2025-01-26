import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'whitesmoke'
    },
    card: {
        padding: '2em',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    editUsername: {
        marginTop: '8px'
    },
    profileImage: {
        position: 'relative',
        display: 'inline-block'
    },
    userTextProperty: {
        width: '100%',
        marginTop: '1em',
        textAlign: 'center'
    }
});
