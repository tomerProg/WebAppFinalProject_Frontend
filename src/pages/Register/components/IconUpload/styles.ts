import { createStyles } from '@mui/styles';

export const styles = createStyles({
    mainBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },    
    iconButton: {
        width: '6em',
        height: '6em',
        padding: '0'
    },
    selectedAvatar:{
        width: '100%', 
        height: '100%', 
    },
    defaultAvatar: {
        width: '100%', 
        height: '100%',
    },
    selectedImage: {
        width: '100%', 
        height: '100%', 
        objectFit: 'cover'
    },
    cameraIcon: {        
        color: 'rgba(0, 0, 0, 0.5)'
    },
    hideInput: {
        clip: 'rect(0 0 0 0)', 
        position: 'absolute'
    },
});
