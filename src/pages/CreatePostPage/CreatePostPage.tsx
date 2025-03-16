import { Box, Button } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import { isNil } from 'ramda';
import { FunctionComponent, useEffect, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import {
    createPost,
    updatePost,
    uploadPostImage
} from '../../api/posts/posts.api';
import { Post, PostForCreation } from '../../api/posts/types';
import { useAlertSnackbar } from '../../components/AlertSnackbar/globalProvider';
import { PAGES_ROUTES } from '../../routes/routes.const';
import { pickDefinedValues } from '../../utils/type.guards';
import PostImage from './components/PostImage/PostImage';
import PostInfoInput from './components/PostInfoInput/PostInfoInput';
import { PostInput, PostInputError } from './components/types';
import { getPostInputError } from './components/utils';
import { styles } from './styles';

export type CreatePostPageLocationState = { post?: Post };

const CreatePostPage: FunctionComponent<WithStyles<typeof styles>> = (
    props
) => {
    const { classes } = props;
    const location: Location<CreatePostPageLocationState> = useLocation();
    const { post }: CreatePostPageLocationState = location.state ?? {};
    const navigate = useNavigate();

    const [postInput, setPostInput] = useState<PostInput>({
        title: '',
        description: ''
    });
    const [postInputError, setPostInputError] = useState<PostInputError>({});
    const [postImage, setPostImage] = useState<File>();
    const { showSnackbar } = useAlertSnackbar();

    useEffect(() => {
        if (post) {
            setPostInput({ title: post.title, description: post.description });
        }
    }, []);

    const isValidPostInput = (): boolean => {
        const newError = getPostInputError(postInput);
        setPostInputError(newError);
        return Object.keys(newError).length === 0;
    };

    const submitPost = async () => {
        if (!isValidPostInput()) {
            return;
        }

        try {
            const imageSrc = isNil(postImage)
                ? undefined
                : (await uploadPostImage(postImage)).data;
            const postFields: PostForCreation = pickDefinedValues({
                ...postInput,
                imageSrc
            });

            if (isNil(post)) {
                await createPost(postFields);
                navigate(PAGES_ROUTES.POSTS_LIST);
            } else {
                await updatePost(post._id, postFields);
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
            showSnackbar('Failed to post. Please try again.', 'error');
        }
    };

    const cancelEditing = () => {
        navigate(-1);
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
                        <PostImage
                            setPostImage={setPostImage}
                            initialPicture={post?.imageSrc}
                        />
                    </div>
                    <div className={classes.containerButtonCreatePost}>
                        {isNil(post) ? (
                            <Button variant='contained' onClick={submitPost}>
                                Create Post
                            </Button>
                        ) : (
                            <Box display='flex' gap={2} mt={3}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={submitPost}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    onClick={cancelEditing}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default withStyles(styles)(CreatePostPage);
