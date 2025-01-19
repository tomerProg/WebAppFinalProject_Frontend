import {
    dislikePost,
    likePost,
    removeDislikePost,
    removeLikePost
} from './api';
import { Post } from './types';

export const removeFromArray = (arr: string[], item: string) =>
    arr.filter((arrItem) => arrItem !== item);

export const toggleLikeInPost = async (
    isPostLiked: boolean | null,
    post: Post,
    userId: string
): Promise<Post> => {
    if (!isPostLiked) {
        await likePost(post._id);
    } else if (isPostLiked) {
        await removeLikePost(post._id);
    }

    const likes =
        isPostLiked === true
            ? removeFromArray(post.likes, userId)
            : post.likes.concat(userId);
    const dislikes =
        isPostLiked === false
            ? removeFromArray(post.dislikes, userId)
            : post.dislikes;

    return { ...post, likes, dislikes };
};

export const toggleDislikeInPost = async (
    isPostLiked: boolean | null,
    post: Post,
    userId: string
): Promise<Post> => {
    if (isPostLiked !== false) {
        await dislikePost(post._id);
    } else if (isPostLiked === false) {
        await removeDislikePost(post._id);
    }
    const likes = isPostLiked
        ? removeFromArray(post.likes, userId)
        : post.likes;
    const dislikes =
        isPostLiked === false
            ? removeFromArray(post.dislikes, userId)
            : post.dislikes.concat(userId);

    return { ...post, likes, dislikes };
};
