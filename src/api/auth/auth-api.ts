import apiClient from '../api-client';
import { LoginResponse, UserWithPassword } from './types';

export const login = (email: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login', { email, password });

export const register = (user: UserWithPassword) =>
    apiClient.post('/auth/register', user);

export const refreshAuthAccessToken = () =>
    apiClient.get<LoginResponse>('/auth/refresh');

export const loginWithGoogle = (credential: string) =>
    apiClient.post<LoginResponse>('/auth/google-login', { credential });
