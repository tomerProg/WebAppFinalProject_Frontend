import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import { isNil } from 'ramda';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { updatePostLike } from '../../api/posts/posts.api';
import { Post, postZodSchema } from '../../api/posts/types';
import { User } from '../../api/users/types';
import { getMyUser, getUserById } from '../../api/users/users.api';
import { ignoreCanceledRequest } from '../../api/utils';
import defaultPostImage from '../../assets/default-post-image.png';
import { useAlertSnackbar } from '../../components/AlertSnackbar/globalProvider';
import UserCard from '../../components/UserCard/UserCard';
import CommentsChat from './components/CommentsChat/CommentsChat';
import LikeDislike from './components/LikeDislike/LikeDislike';
import PostInfo from './components/PostInfo/PostInfo';
import { styles } from './styles';
import { PAGES_ROUTES } from '../../routes/routes.const';

export type PostPageLocationState = { post: Post; owner?: User };

const PostPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const location: Location<PostPageLocationState> = useLocation();
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [post, setPost] = useState<Post | null>(null);
    const [postOwner, setPostOwner] = useState<User>();
    const [likedPost, setLikedPost] = useState<boolean>();
    const { showSnackbar } = useAlertSnackbar();

    useEffect(() => {
        const { post, owner } = location.state;
        const validation = postZodSchema.safeParse(post);
        if (validation.error) {
            console.error(validation.error);
            navigate(PAGES_ROUTES.POSTS_LIST);
        } else {
            setPostOwner(owner);
            setPost(validation.data);
            const { request, abort } = getMyUser();
            request
                .then(({ data: { _id } }) => setUserId(_id))
                .catch(ignoreCanceledRequest);

            return () => abort();
        }
    }, [location, navigate]);

    useEffect(() => {
        if (post && isNil(location.state.owner)) {
            const { request, abort } = getUserById(post.owner);
            request
                .then(({ data }) => setPostOwner(data))
                .catch(ignoreCanceledRequest);

            return () => abort();
        }
    }, [post, location]);

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
        const oldLikedPost = likedPost;
        const newLikedPost = likedPost === false ? undefined : false;
        setLikedPost(newLikedPost);
        updatePostLike(post._id, newLikedPost).catch(() => {
            showSnackbar('failed to dislike post', 'error', 1000);
            setLikedPost(oldLikedPost);
        });
    }, [post, likedPost, showSnackbar]);

    const toggleLike = useCallback(async () => {
        if (!post) {
            return;
        }
        const oldLikedPost = likedPost;
        const newLikedPost = likedPost ? undefined : true;
        setLikedPost(newLikedPost);
        updatePostLike(post._id, newLikedPost).catch(() => {
            showSnackbar('failed to like post', 'error', 1000);
            setLikedPost(oldLikedPost);
        });
    }, [post, likedPost, showSnackbar]);

    return (
        <div className={classes.root}>
            <section
                id='left-pannel'
                className={clsx(classes.pannel, classes.leftPannel)}
            >
                {post && (
                    <>
                        <PostInfo post={post} />
                        <CommentsChat postId={post._id} loggedUserId={userId} />
                    </>
                )}
            </section>

            <section
                id='right-pannel'
                className={clsx(classes.pannel, classes.rightPannel)}
            >
                <img
                    className={clsx(classes.postImage, {
                        [classes.defaultPostImage]: !post?.imageSrc
                    })}
                    src={post?.imageSrc ?? defaultPostImage}
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

export default withStyles(styles)(PostPage);
