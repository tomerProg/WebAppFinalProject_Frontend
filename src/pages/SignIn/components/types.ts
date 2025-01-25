export interface SignInInput {
    email: string;
    password: string;
}

export type SignInError = Partial<SignInInput>;
