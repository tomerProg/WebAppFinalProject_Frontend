import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        margin: '1%',
        border: '1px solid #0000001c',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: '60%',
        justifyContent: 'space-between',
        background: 'whitesmoke'
    },
    comments: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        alignItems: 'flex-start'
    },
    commentInput: {
        margin: '1%',
        '& .MuiOutlinedInput-root': {
            maxHeight: '3.5em',
            borderRadius: `100px`,
            background: 'white'
        }
    }
});
