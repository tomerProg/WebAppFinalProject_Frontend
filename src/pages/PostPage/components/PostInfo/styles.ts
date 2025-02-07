import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column'
    },
    description: {
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
        margin: '12px 0',
        flexGrow: 1
    },
    suggastionText: {
        overflowY: 'auto'
    }
});
