import { Button, Tooltip } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { isNil } from 'ramda';
import React, { FunctionComponent, useRef, useState } from 'react';
import { styles } from './styles';
import { AddPhotoAlternate } from '@mui/icons-material';

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
            <Tooltip
                title='Add Image'
                arrow
                disableHoverListener={!isNil(selectedImage)}
            >
                <div
                    className={classes.imageButton}
                    onClick={() => inputRef.current?.click()}
                >
                    {selectedImage ? (
                        <img
                            className={classes.postImage}
                            src={selectedImage}
                        />
                    ) : (
                        <AddPhotoAlternate 
                        style={{fontSize: '10em', height: '100%', width: '100%'}} 
                        />
                    )}
                </div>
            </Tooltip>
            <input
                type='file'
                accept='image/*'
                className={classes.hideInput}
                ref={inputRef}
                onChange={handleImageChange}
            />

            {selectedImage && (
                <div className={classes.removeImageContainer}>
                    <Button
                        variant='text'
                        color='error'
                        size='small'
                        onClick={handleRemoveIcon}
                    >
                        Remove Image
                    </Button>
                </div>
            )}
        </div>
    );
};

export default withStyles(styles)(PostImage);
