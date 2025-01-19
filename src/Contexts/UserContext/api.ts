import { User } from './UserContext';

export const fetchUserDetails = async (userId: User['_id']): Promise<User> => ({
    _id: userId,
    email: 'userEmail',
    username: 'some username'
});
