import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column'
    },
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
    description: {
        // maxHeight: '15%',
        minHeight: '15%',
        overflowY: 'auto',
        margin: '4px 0',
        flexGrow: 1
    },
    suggastionIcon: {
        margin: '0px 12px 8px 0px'
    },
    suggastionPaper: {
        display: 'flex',
        minHeight: '15%',
        maxHeight: '40%',
        margin: '12px 0'
    },
    suggastionText: {
        overflowY: 'auto'
    }
});
