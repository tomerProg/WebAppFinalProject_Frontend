import { createStyles } from '@mui/styles';

export const styles = createStyles({
    appBar: {
        height: '10%'
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    logoImage: {
        aspectRatio: 1,
        height: '100%',
        paddingBottom: '10px',
    },
    avatarButton: {
        height: '100%',
        aspectRatio: '1',
        padding: '0'
    }
});
