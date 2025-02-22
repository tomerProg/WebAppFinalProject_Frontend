import { createStyles } from '@mui/styles';

export const styles = createStyles({
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
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    mainBox: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    pannel: {
        margin: '1%',
        flexGrow: 1,
        background: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    leftPannel: {
        width: '56%'
    },
    rightPannel: {
        width: '40%',
        padding: '2%'
    },
    containerButtonCreatePost: {
        width: '100%',
        height: '50%',
        paddingLeft: '15%',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
    },
    buttonCreatePost:{
        width: '40%',
    },
    errorAlert:{
        width: '20%'
    }
});
