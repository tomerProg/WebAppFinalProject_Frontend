import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        alignItems: 'baseline',
        paddingBottom: '5%',
        maxHeight: '20%'
    },
    titleLabel: {
        padding: '0 0.5em'
    },
    description: {
        maxHeight: '80%',
        '& textarea': {
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
    }
});
