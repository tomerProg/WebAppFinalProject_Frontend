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
    postItem: {
        cursor: 'pointer',
        padding: '4px 1em',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s, transform 0.2s',
        '&:hover': {
            backgroundColor: '#f0f0f0',
            transform: 'scale(1.02)'
        }
    },
    postDescription: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2
    },
    buttonsSection: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: '0.5em'
    }
});
