import { Button } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/posts/posts.api';
import { useAlertSnackbar } from '../../components/AlertSnackbar/globalProvider';
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
    const [postImage, setPostImage] = useState<File>();
    const { showSnackbar } = useAlertSnackbar();

    const isValidPostInput = (): boolean => {
        const newError = getPostInputError(postInput);
        setPostInputError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidPostInput()) {
            return;
        }

        try {
            await createPost(postInput, postImage);
            navigate('/posts');
        } catch (error) {
            console.error(error);
            showSnackbar('Failed to post. Please try again.', 'error');
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.mainBox}>
                <section className={clsx(classes.pannel, classes.leftPannel)}>
                    <PostInfoInput
                        setPostInput={setPostInput}
                        postInput={postInput}
                        setPostInputError={setPostInputError}
                        postInputError={postInputError}
                    />
                </section>

                <section className={clsx(classes.pannel, classes.rightPannel)}>
                    <div style={{ width: '100%', height: '80%' }}>
                        <PostImage setPostImage={setPostImage} />
                    </div>
                    <div className={classes.containerButtonCreatePost}>
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={handleSubmit}
                        >
                            Create Post
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default withStyles(styles)(CreatePostPage);
