import apiClient from '../api-client';

export const likePost = async (postId: string) =>
    apiClient.put(`/posts/like/${postId}`);

export const removeLikePost = async (postId: string) =>
    apiClient.delete(`/posts/like/${postId}`);

export const dislikePost = async (postId: string) =>
    apiClient.put(`/posts/dislike/${postId}`);

export const removeDislikePost = async (postId: string) =>
    apiClient.delete(`/posts/dislike/${postId}`);
