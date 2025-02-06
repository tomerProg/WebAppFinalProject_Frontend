import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { Post } from './types';

export const updatePostLike = async (postId: string, like?: boolean) =>
    apiClient.put(`/posts/like/${postId}`, { like });

export const getAllPosts = () => AbortableRequest((abortController) =>
    apiClient.get<Post[]>('/post', { signal: abortController.signal })
);
