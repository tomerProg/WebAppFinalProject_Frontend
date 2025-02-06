import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { LoginResponse, UserWithPassword } from './types';

export const login = (email: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login', { email, password });

export const register = (user: UserWithPassword) =>
    apiClient.post('/auth/register', user);

export const refresh = (refreshToken: string) =>
    AbortableRequest((abortController) =>
        apiClient.post<LoginResponse>(
            '/auth/refresh',
            { refreshToken },
            { signal: abortController.signal }
        )
    );

export const loginWithGoogle = (credential: string) =>
    apiClient.post<LoginResponse>('/auth/google-login', { credential });
