import { createContext } from 'react';

export type User = {
    _id: string;
    email: string;
    nickname: string;
    profileImage?: string;
};

export const UserContext = createContext<User>({
    _id: 'userId',
    email: 'defaultUser@gmail.com',
    nickname: 'def user'
});
