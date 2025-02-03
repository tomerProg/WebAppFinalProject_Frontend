import apiClient from '../api-client';

export const uploadProfileImage = (profileImage: File) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    return apiClient.post<string>('files/profile-image?profileImage=123.jpeg', formData, {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
};
