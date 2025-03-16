import { isNil } from 'ramda';
import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { GetPostsFilter, Post, PostForCreation } from './types';

export const updatePostLike = async (postId: string, like?: boolean) =>
    apiClient.put(`/post/like/${postId}`, { like });

export const getPosts = (filter: GetPostsFilter = {}) => {
    const params = {
        ...(isNil(filter.owner) ? {} : { owner: filter.owner }),
        ...(isNil(filter.pagination) ? {} : filter.pagination)
    };

    return AbortableRequest((abortController) =>
        apiClient.get<Post[]>('/post', {
            signal: abortController.signal,
            params
        })
    );
};

export const createPost = async (post: PostForCreation) =>
    apiClient.post('/post', post);

export const uploadPostImage = (postImage: File) => {
    const formData = new FormData();
    formData.append('postImage', postImage);
    return apiClient.post<string>('files/post-image', formData, {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
};

export const updatePost = (postId: string, editFields: PostForCreation) =>
    apiClient.put(`/post/${postId}`, editFields);
