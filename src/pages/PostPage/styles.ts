import { createStyles } from '@mui/styles';

export const styles = createStyles({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '5px'
        },
        '*::-webkit-scrollbar-track': {
            background: '#E4EFEF'
        },
        '*::-webkit-scrollbar-thumb': {
            background: '#1D388F61',
            borderRadius: '2px'
        }
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    pannel: {
        margin: '1%',
        flexGrow: 1,
        background: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    leftPannel: {
        width: '56%'
    },
    rightPannel: {
        width: '40%',
        padding: '2%'
    },
    postImage: {
        height: '50%',
        objectFit: 'contain',
        background: 'whitesmoke',
        borderRadius: '16px',
        border: '1px solid #0000001c'
    },
    defaultPostImage: {
        padding: '8px '
    },
    userCardSection: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    userCard: {
        width: '100%'
    }
});
