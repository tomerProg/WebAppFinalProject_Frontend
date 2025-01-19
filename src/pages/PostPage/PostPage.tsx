import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import {
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import defaultPostImage from '../../assets/default-post-image.png';
import UserCard from '../../components/UserCard/UserCard';
import { fetchUserDetails } from '../../Contexts/UserContext/api';
import { User, UserContext } from '../../Contexts/UserContext/UserContext';
import CommentsChat from './components/CommentsChat/CommentsChat';
import LikeDislike from './components/LikeDislike/LikeDislike';
import PostInfo from './components/PostInfo/PostInfo';
import { globalPost } from './consts';
import { styles } from './styles';
import { Post } from './types';
import { toggleDislikeInPost, toggleLikeInPost } from './utils';

const BasePostPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const { _id: userId } = useContext(UserContext);
    const [post, setPost] = useState<Post | null>(null);
    const [postOwner, setPostOwner] = useState<User | null>(null);
    const [likedPost, setLikedPost] = useState<boolean | null>(null);

    useEffect(() => {
        // TODO: get post from local location
        setPost(globalPost);
    }, []);

    useEffect(() => {
        if (post) {
            fetchUserDetails(post.owner).then(setPostOwner);
        }
    }, [post]);

    useEffect(() => {
        const isLiked = (post?.likes ?? []).includes(userId);
        const isDisliked = (post?.dislikes ?? []).includes(userId);

        if (isLiked || isDisliked) {
            setLikedPost(isLiked && !isDisliked);
        }
    }, [post, userId]);

    const toggleDislike = useCallback(async () => {
        if (!post) {
            return;
        }
        const updatedPost = await toggleDislikeInPost(likedPost, post, userId);
        setPost(updatedPost);
        setLikedPost(likedPost === false ? null : false);
    }, [post, likedPost, userId]);

    const toggleLike = useCallback(async () => {
        if (!post) {
            return;
        }
        const updatedPost = await toggleLikeInPost(likedPost, post, userId);
        setPost(updatedPost);
        setLikedPost(likedPost ? null : true);
    }, [post, likedPost, userId]);

    return (
        <div className={classes.root}>
            <section
                id='left-pannel'
                className={clsx(classes.pannel, classes.leftPannel)}
            >
                {post && <PostInfo post={post} />}

                <CommentsChat postId={post?._id ?? ''} />
            </section>

            <section
                id='right-pannel'
                className={clsx(classes.pannel, classes.rightPannel)}
            >
                <img
                    className={clsx(classes.postImage, {
                        [classes.defaultPostImage]: !post?.postImage
                    })}
                    src={post?.postImage ?? defaultPostImage}
                />

                <LikeDislike
                    isLiked={likedPost}
                    onLikeClick={toggleLike}
                    onDislikeClick={toggleDislike}
                />
                <section className={classes.userCardSection}>
                    <UserCard user={postOwner} className={classes.userCard} />
                </section>
            </section>
        </div>
    );
};

const PostPage = withStyles(styles)(BasePostPage);
export default PostPage;
