import { createStyles } from '@mui/styles';

export const styles = createStyles({
    registerTitle: {
        margin: '0 2em',
        marginBottom: '1em',
        display: 'flex',
        alignItems: 'center'
    },
    mainBox: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        placeItems: 'center',
        gap: '1em',
        padding: '1em 0'
    },

    registerButton: {
        width: '80%',
    },

    frame: {
        marginTop: '1em',
        marginBottom: '1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInBox: {
        textAlign: 'center'
    }
});
