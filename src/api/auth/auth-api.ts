import { RegisterInput } from '../../pages/Register/components/types';
import apiClient from '../api-client';
import { uploadProfileImage } from '../users/users.api';
import { LoginResponse, UserWithPassword } from './types';

export const login = (email: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login', { email, password });

export const register = async (
    registerInput: RegisterInput,
    profileImageFile?: File
) => {
    const user: UserWithPassword = {
        email: registerInput.email,
        password: registerInput.password,
        username: registerInput.userName
    };
    const imageUrl = profileImageFile
        ? await uploadProfileImage(profileImageFile)
        : null;
    const userToRegister: UserWithPassword = {
        ...user,
        ...(imageUrl ? { profileImage: imageUrl.data } : {})
    };

    return apiClient.post('/auth/register', userToRegister);
};

export const refreshAuthAccessToken = () =>
    apiClient.get<LoginResponse>('/auth/refresh');

export const loginWithGoogle = (credential: string) =>
    apiClient.post<LoginResponse>('/auth/google-login', { credential });
