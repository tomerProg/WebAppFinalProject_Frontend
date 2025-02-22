import apiClient from '../api-client';
import { PostComment } from './types';

export const getPostComments = (
    postId: string,
    abortControler?: AbortController
) =>
    apiClient.get<PostComment[]>('/comment', {
        params: { postId },
        signal: abortControler?.signal
    });

export const uploadComment = async (postId: string, content: string) =>
    apiClient.post<PostComment>('/comment', { postId, content });
