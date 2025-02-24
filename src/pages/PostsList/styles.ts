import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        padding: '2em',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
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
    },
    buttonsSection: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: '0.5em'
    }
});
