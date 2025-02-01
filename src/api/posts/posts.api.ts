import apiClient from '../api-client';

export const updatePostLike = async (postId: string, like?: boolean) =>
    apiClient.put(`/posts/like/${postId}`, { like });
