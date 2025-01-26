import { User } from '../../pages/UserProfilePage/types';
import apiClient from '../api-client';
import { AbortableRequest } from '../utils';

const uploadProfileImage = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    const { data: imageUrl } = await apiClient.post<string>(
        '/users/profile-image',
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
    // TODO: put request to server
    const { data: user } = await apiClient.put<User>('/users', updatedUser);

    return user;
};

export const getMyUser = () =>
    AbortableRequest((abortController) =>
        apiClient.get<User>('/users/me', { signal: abortController.signal })
    );
