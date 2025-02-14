import { createStyles } from '@mui/styles';

export const styles = createStyles({
    registerTitle: {
        marginBottom: '1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBox: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        placeItems: 'center',
        gap: '1em',
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
