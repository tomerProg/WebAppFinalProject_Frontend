import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { User } from './types';

export const getUserById = (userId: string) =>
    AbortableRequest((abortController) =>
        apiClient.get<User>(`/users/${userId}`, {
            signal: abortController.signal
        })
    );

export const updateUser = async (
    username: User['username'],
    imageFile?: File
) => {
    const imageUrl = imageFile ? await uploadProfileImage(imageFile) : null;
    const updatedUser: Omit<User, 'email'> = {
        username,
        ...(imageUrl ? { profileImageUrl: imageUrl.data } : {})
    };

    return apiClient.put<User>('/users', updatedUser);
};

export const getMyUser = () =>
    AbortableRequest((abortController) =>
        apiClient.get<User>('/users/me', { signal: abortController.signal })
    );

export const uploadProfileImage = (profileImage: File) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    return apiClient.post<string>(
        'files/profile-image',
        formData,
        {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        }
    );
};
