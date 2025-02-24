import { createStyles } from '@mui/styles';

export const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    mainBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    pannel: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2%',
        boxSizing: 'border-box'
    },
    leftPannel: {
        width: '60%'
    },
    rightPannel: {
        width: '40%',
        justifyContent: 'space-between'
    },
    postImage: {
        width: '100%',
        height: '80%'
    },
    containerButtonCreatePost: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 2em',
        boxSizing: 'border-box',
        maxHeight: '20%'
    }
});
