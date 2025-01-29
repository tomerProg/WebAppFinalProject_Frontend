import apiClient from '../api-client';
import { AbortableRequest } from '../utils';
import { User } from './types';

const uploadProfileImage = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    const { data: imageUrl } = await apiClient.post<string>(
        '/files/profile-image',
        formData,
        {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        }
    );

    return imageUrl;
};

export const updateUser = async (
    username: User['username'],
    imageFile?: File
) => {
    const imageUrl = imageFile ? await uploadProfileImage(imageFile) : null;
    const updatedUser: Omit<User, 'email'> = {
        username,
        ...(imageUrl ? { profileImageUrl: imageUrl } : {})
    };

    return apiClient.put<User>('/users', updatedUser);
};

export const getMyUser = () =>
    AbortableRequest((abortController) =>
        apiClient.get<User>('/users/me', { signal: abortController.signal })
    );
