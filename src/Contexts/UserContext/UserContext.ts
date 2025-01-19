import { createContext } from 'react';

export type User = {
    _id: string;
    email: string;
    username: string;
    profileImage?: string;
};

export const UserContext = createContext<User>({
    _id: 'userId',
    email: 'defaultUser@gmail.com',
    username: 'def user'
});
