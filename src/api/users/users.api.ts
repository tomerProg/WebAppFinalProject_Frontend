import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { User } from './types';

export const getUserById = (userId: string) =>
    AbortableRequest((abortController) =>
        apiClient.get<User>(`/users/${userId}`, { signal: abortController.signal })
    );
