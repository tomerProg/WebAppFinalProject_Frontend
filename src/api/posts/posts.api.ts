import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { Post, PostForCreation } from './types';

export const updatePostLike = async (postId: string, like?: boolean) =>
    apiClient.put(`/posts/like/${postId}`, { like });

export const getAllPosts = () =>
    AbortableRequest((abortController) =>
        apiClient.get<Post[]>('/post', { signal: abortController.signal })
    );

export const createPost = async (post: PostForCreation, imageFile?: File) => {
    const imageUrl = imageFile ? await uploadPostImage(imageFile) : null;
    const postForCreate: PostForCreation = {
        ...post,
        ...(imageUrl ? { imageSrc: imageUrl.data } : {})
    };

    return apiClient.post('/post', postForCreate);
};

export const uploadPostImage = (postImage: File) => {
    const formData = new FormData();
    formData.append('postImage', postImage);
    return apiClient.post<string>('files/post-image', formData, {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
};
