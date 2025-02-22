import React, { useState, useRef, FunctionComponent } from 'react';
import { IconButton, Avatar, Box, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useStyles } from './styles';

interface IconUploadProps {
    setProfileImageFile: (profileImage: File) => void;
}

const IconUpload: FunctionComponent<IconUploadProps> = (props) => {
    const classes = useStyles();
    const { setProfileImageFile } = props;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setProfileImageFile(file);
        }
    };

    const handleRemoveIcon = () => {
        setSelectedImage(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <Box className={classes.mainBox}>
            <IconButton
                className={classes.iconButton}
                onClick={() => inputRef.current?.click()}
            >
                <Avatar
                    sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: selectedImage
                            ? 'transparent'
                            : 'action.selected'
                    }}
                >
                    {selectedImage ? (
                        <img
                            className={classes.selectedImage}
                            src={selectedImage}
                            alt='Selected icon'
                        />
                    ) : (
                        <CameraAltIcon
                            fontSize='large'
                            className={classes.cameraIcon}
                        />
                    )}
                </Avatar>
            </IconButton>

            <input
                type='file'
                accept='image/*'
                className={classes.hideInput}
                ref={inputRef}
                onChange={handleImageChange}
            />

            {selectedImage && (
                <Button
                    variant='text'
                    color='error'
                    size='small'
                    onClick={handleRemoveIcon}
                >
                    Remove Icon
                </Button>
            )}
        </Box>
    );
};

export default IconUpload;
