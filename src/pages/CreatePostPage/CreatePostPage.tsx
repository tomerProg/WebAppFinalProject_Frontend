import { Alert, Box, Button } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/posts/posts.api';
import PostImage from './components/PostImage/PostImage';
import PostInfoInput from './components/PostInfoInput/PostInfoInput';
import { PostInput, PostInputError } from './components/types';
import { getPostInputError } from './components/utils';
import { styles } from './styles';

const CreatePostPage: FunctionComponent<WithStyles<typeof styles>> = (
    props
) => {
    const { classes } = props;
    const navigate = useNavigate();

    const [postInput, setPostInput] = useState<PostInput>({
        title: '',
        description: ''
    });
    const [postInputError, setPostInputError] = useState<PostInputError>({});
    const [submitError, setSubmitError] = useState<string>('');
    const [postImage, setPostImage] = useState<File>();

    const isValidPostInput = (): boolean => {
        const newError = getPostInputError(postInput);
        setPostInputError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!isValidPostInput()) {
            return;
        }

        try {
            await createPost(postInput, postImage);
            navigate('/posts');
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to post. Please try again.');
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.mainBox}>
                <section
                    id='left-pannel'
                    className={clsx(classes.pannel, classes.leftPannel)}
                >
                    <PostInfoInput
                        setPostInput={setPostInput}
                        postInput={postInput}
                        setPostInputError={setPostInputError}
                        postInputError={postInputError}
                    />
                </section>

                <section
                    id='right-pannel'
                    className={clsx(classes.pannel, classes.rightPannel)}
                >
                    <PostImage setPostImage={setPostImage} />
                </section>
            </Box>

            <Box
                component='section'
                gap={2}
                className={classes.containerButtonCreatePost}
            >
                <Button
                    type='submit'
                    variant='contained'
                    onClick={handleSubmit}
                    className={classes.buttonCreatePost}
                >
                    Create Post
                </Button>
                {submitError && (
                    <Alert severity='error' className={classes.errorAlert}>
                        {submitError}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default withStyles(styles)(CreatePostPage);
