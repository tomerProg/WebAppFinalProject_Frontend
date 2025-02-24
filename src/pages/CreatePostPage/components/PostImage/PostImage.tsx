import { AddPhotoAlternate, ImageNotSupported } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import React, { FunctionComponent, useRef, useState } from 'react';
import { styles } from './styles';

interface PostImageProps extends WithStyles<typeof styles> {
    setPostImage: (postImage: File) => void;
}

const PostImage: FunctionComponent<PostImageProps> = (props) => {
    const { setPostImage, classes } = props;
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
        <div className={classes.root}>
            <section className={classes.actionsSection}>
                <IconButton
                    sx={{
                        borderRadius: '4px',
                        padding: '1px'
                    }}
                    onClick={
                        selectedImage
                            ? handleRemoveIcon
                            : () => inputRef.current?.click()
                    }
                >
                    {selectedImage ? (
                        <ImageNotSupported fontSize='large' htmlColor='black' />
                    ) : (
                        <AddPhotoAlternate fontSize='large' htmlColor='black' />
                    )}
                </IconButton>
            </section>

            <div className={classes.imagePreview}>
                {selectedImage ? (
                    <img className={classes.postImage} src={selectedImage} />
                ) : (
                    <Typography
                        className={classes.imagePreviewText}
                        variant='h4'
                        color='textDisabled'
                    >
                        Image Preview
                    </Typography>
                )}
            </div>

            <input
                type='file'
                accept='image/*'
                className={classes.hideInput}
                ref={inputRef}
                onChange={handleImageChange}
            />
        </div>
    );
};

export default withStyles(styles)(PostImage);
