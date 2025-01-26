import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { PostComment } from './types';

export const getPostComments = (postId: string) =>
    AbortableRequest((abortControler) =>
        apiClient.get<PostComment[]>('/comments', {
            params: { postId },
            signal: abortControler.signal
        })
    );

export const uploadComment = async (content: string) =>
    apiClient.post<PostComment>('/comments', { content });
