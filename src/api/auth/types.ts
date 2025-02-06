type User = {
    email: string;
    username: string;
    profileImage?: string;
};

export type UserWithPassword = User & {
    password: string;
};

export type LoggedUser = User & {
    refreshToken: string;
};

export type LoginResponse = {
    _id: string;
    accessToken: string;
    refreshToken: string;
};
