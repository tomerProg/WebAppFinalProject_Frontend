import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import {
    FunctionComponent,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post, postZodSchema } from '../../api/posts/types';
import { User } from '../../api/users/types';
import { getUserById } from '../../api/users/users.api';
import { ignoreCanceledRequest } from '../../api/utils';
import defaultPostImage from '../../assets/default-post-image.png';
import { useAlertSnackbar } from '../../components/AlertSnackbar/globalProvider';
import UserCard from '../../components/UserCard/UserCard';
import { UserIdContext } from '../../Contexts/UserIdContext/UserContext';
import PostInfo from './components/Layout/Layout';
import { styles } from './styles';
import PostImage from './components/PostImage/PostImage';
import { createPost, uploadPostImage } from '../../api/posts/posts.api';

const CreatePostPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();

    const userId = useContext(UserIdContext);
    const [postInput, setPostInput] = useState<Post>({
        _id: '',
        title: '',
        owner: '',
        description: '',
        suggastion: '',
        likes: [],
        dislikes: [],
        imageSrc: ''
    });
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
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            // setSubmitError('');
    
            if (!isValidPostInput()) {
                return;
            }
    
            const postImageUrl = await tryUploadPostImage();
            const postToCreate: Post = {
                ...postInput,
                owner: userId,
                imageSrc: postImageUrl
            };
    
            try {
                await createPost(postToCreate);
                navigate('/posts');
            } catch (error) {
                console.error(error);
                // setSubmitError('Failed to register. Please try again.');
            }
        };

    return (
        <div className={classes.root}>
            <section id='left-pannel' className={clsx(classes.pannel, classes.leftPannel)}>
                <PostInfo setPost={setPostInput} post={postInput} />
            </section>

            <section
                id='right-pannel'
                className={clsx(classes.pannel, classes.rightPannel)}>
                {/* <img
                    className={classes.postImage}
                    src={post?.imageSrc ?? defaultPostImage}
                /> */}
                <PostImage setPostImage={setPostImage}/>
                {/* <section className={classes.userCardSection}>
                    <UserCard user={postOwner} className={classes.userCard} />
                </section> */}
            </section> 
        </div>
    );
};

export default withStyles(styles)(CreatePostPage);
