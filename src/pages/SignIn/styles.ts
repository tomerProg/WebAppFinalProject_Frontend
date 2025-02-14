import { createStyles } from '@mui/styles';

export const styles = createStyles({
    mainBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInButton: {
        width: '100%'
    },
    signinActions: {
        marginTop: '1em',
        marginBottom: '1em',
        width: '100%'
    },
    registerBox: {
        textAlign: 'center'
    },
    googleBtn: {
        margin: '0.75em 0',
        display: 'flex',
        justifyContent: 'center'
    },
    actionsDivider: {
        padding: '0.5em 0'
    }
});
