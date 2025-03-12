import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { User } from './types';

export const getUserById = (userId: string) =>
    AbortableRequest((abortController) =>
        apiClient.get<User>(`/user/${userId}`, {
            signal: abortController.signal
        })
    );

export const updateUser = async (
    baseUser: User,
    updateFields: {
        username?: User['username'];
        imageFile?: File;
    }
) => {
    const { username, imageFile } = updateFields;
    const imageUrl = imageFile ? await uploadProfileImage(imageFile) : null;
    const updatedUser: Omit<User, 'email'> = {
        ...baseUser,
        username: username ?? baseUser.username,
        ...(imageUrl ? { profileImage: imageUrl.data } : {})
    };

    return apiClient.put<User>('/user', updatedUser);
};

export const getMyUser = () =>
    AbortableRequest((abortController) =>
        apiClient.get<User>('/user', { signal: abortController.signal })
    );

export const uploadProfileImage = (profileImage: File) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    return apiClient.post<string>('files/profile-image', formData, {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
};
