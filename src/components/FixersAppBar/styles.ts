import { createStyles } from '@mui/styles';

export const styles = createStyles({
    appBar: {
        height: '10vh',
    },
    middleBox: {
        flexGrow: '1'
    },
    leftBox:{
        display: 'flex', 
        alignItems: 'flex-end', 

    },
    avatarButton: {
        width: '10vh',
        height: '10vh',
        padding: '0'
    },
    fixersIcon: {
        height: "60px", 
        width: "90px",
        marginBottom: '1em',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
    }
});