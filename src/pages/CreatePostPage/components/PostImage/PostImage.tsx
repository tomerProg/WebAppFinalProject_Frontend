import React, { useState, useRef, FunctionComponent } from 'react';
import {Box, Button, ButtonBase, Tooltip } from '@mui/material';
import defaultPostImage from '../../../../assets/default-post-image.png';
import { withStyles, WithStyles } from '@mui/styles';
import { useStyles } from './styles';


interface PostImageProps {
    setPostImage: (postImage: File) => void;
}

const PostImage: FunctionComponent<PostImageProps> = (props) => {
    const { setPostImage } = props;
    const classes = useStyles();
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
            setPostImage(file);
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
            <Tooltip title='Add Image' arrow>
                <ButtonBase
                    className={classes.imageButton}
                    onClick={() => inputRef.current?.click()}
                >
                    <img
                        className={classes.postImage}
                        src={selectedImage ? selectedImage : defaultPostImage}    
                    />   
                </ButtonBase>
            </Tooltip>
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
                    Remove Image
                </Button>
            )}            
        </Box>
        
    );
};

export default PostImage;
