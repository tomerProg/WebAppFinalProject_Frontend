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
import { uploadPostImage } from '../../api/posts/posts.api';

const CreatePostPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post>({
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
    

    // const userId = useContext(UserIdContext);
    // const [post, setPost] = useState<Post | null>(null);
    // const [postOwner, setPostOwner] = useState<User | null>(null);
    // const [likedPost, setLikedPost] = useState<boolean>();
    // const { showSnackbar } = useAlertSnackbar();

    // useEffect(() => {
    //     const post = location.state;
    //     const validation = postZodSchema.safeParse(post);
    //     if (validation.error) {
    //         console.error(validation.error);
    //         navigate('/posts');
    //     } else {
    //         setPost(validation.data);
    //     }
    // }, [location, navigate]);

    // useEffect(() => {
    //     if (post) {
    //         const { request, abort } = getUserById(post.owner);
    //         request
    //             .then(({ data }) => setPostOwner(data))
    //             .catch(ignoreCanceledRequest);

    //         return () => abort();
    //     }
    // }, [post]);

    // useEffect(() => {
    //     const isLiked = (post?.likes ?? []).includes(userId);
    //     const isDisliked = (post?.dislikes ?? []).includes(userId);

    //     if (isLiked || isDisliked) {
    //         setLikedPost(isLiked && !isDisliked);
    //     }
    // }, [post, userId]);

    return (
        <div className={classes.root}>
            <section id='left-pannel' className={clsx(classes.pannel, classes.leftPannel)}>
                <PostInfo setPost={setPost} post={post} />
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
