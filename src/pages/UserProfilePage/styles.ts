import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    profilePannel: {
        width: '50%',
        height: '100%'
    },
    postsPannel: {
        height: '100%',
        width: '50%',
        padding: '2% 5%',
        display: 'flex',
        flexDirection: 'column'
    },
    postsTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    postsList: {
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: 'whitesmoke',
        '&::-webkit-scrollbar': {
            width: '5px'
        },
        '&::-webkit-scrollbar-track': {
            background: '#E4EFEF'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#1D388F61',
            borderRadius: '2px'
        }
    }
});
