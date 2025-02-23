import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import {
    FunctionComponent,
    useCallback,
    useContext,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../api/posts/types';
import { UserIdContext } from '../../Contexts/UserIdContext/UserContext';
import PostInfoInput from './components/PostInfoInput/PostInfoInput';
import { styles } from './styles';
import PostImage from './components/PostImage/PostImage';
import { createPost, uploadPostImage } from '../../api/posts/posts.api';
import { getPostInputError } from './components/utils';
import { PostInput, PostInputError } from './components/types';
import { Alert, Box, Button } from '@mui/material';

const CreatePostPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();

    const userId = useContext(UserIdContext);
    const [postInput, setPostInput] = useState<PostInput>({
        title: '',
        description: '',
    });
    const [postInputError, setPostInputError] = useState<PostInputError>({});
    const [submitError, setSubmitError] = useState<string>('');
    
    const [postImage, setPostImage] = useState<File | null>(null);
    
    const tryUploadPostImage = useCallback(async () => {
        if (!postImage) return undefined;

        try {
            const { data: imageUrl } = await uploadPostImage(postImage);
            return imageUrl;
        } catch (error) {
            console.error('failed uploading post image', error);
            return undefined;
        }
    }, [postImage]);
    
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
    
            const postImageUrl = await tryUploadPostImage();
            const postToCreate: Post = {
                _id: '',
                title: postInput.title,
                description: postInput.description,
                suggestion: 'my suggestion',
                owner: userId,
                imageSrc: postImageUrl,
                likes: [],
                dislikes: []
            };
    
            try {
                await createPost(postToCreate);
                navigate('/posts');
            } catch (error) {
                console.error(error);
                setSubmitError('Failed to post. Please try again.');
            }
        };

    return (
        <Box className={classes.root}>
            <Box className={classes.mainBox} >   
                <section id='left-pannel' className={clsx(classes.pannel, classes.leftPannel)}>
                    <PostInfoInput 
                        setPostInput={setPostInput} 
                        postInput={postInput} 
                        setPostInputError={setPostInputError}
                        postInputError={postInputError}/>
                </section>

                <section
                    id='right-pannel'
                    className={clsx(classes.pannel, classes.rightPannel)}>
                    <PostImage setPostImage={setPostImage}/>
                </section> 
            </Box>
            
            <Box 
            component='section' 
            gap={2}
            className={classes.containerButtonCreatePost} >
                    <Button
                        type='submit'
                        variant='contained'
                        onClick={handleSubmit}
                        className={classes.buttonCreatePost}
                    >
                        Create Post
                    </Button>
                    {submitError && 
                    <Alert severity='error' className={classes.errorAlert}> 
                        {submitError} 
                    </Alert>}
            </Box>

        </Box>
    );
};

export default withStyles(styles)(CreatePostPage);
