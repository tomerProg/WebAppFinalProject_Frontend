import defaultAvatar from '../../assets/default avatar.png';
import { User } from './types';

export const uploadProfileImage = async (file: File) => {
    console.log('uploadImg');
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    // TODO: post to server

    return defaultAvatar;
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

    return updatedUser;
};
