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
        display: 'flex',
        background: 'whitesmoke'
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
    likeBtnSection: {
        display: 'flex',
        height: '3em',
        width: '5em',
        margin: '0 8px',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    likeIconBtn: {
        padding: 0,
        '&:focus': {
            outline: 'none'
        },
        '&:hover': {
            backgroundColor: 'none'
        }
    },
    likeIcon: {
        '&:hover': {
            fontSize: '1.3em'
        }
    },
    profileCard: {
        display: 'flex',
    },
    profileAvatar: {
        margin: '8px'
    }
});
