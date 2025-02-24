import { createStyles } from '@mui/styles';

export const styles = createStyles({
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
    }
});
