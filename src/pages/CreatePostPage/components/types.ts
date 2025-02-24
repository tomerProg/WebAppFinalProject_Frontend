export interface PostInput {
    title: string;
    description: string;
}

export type PostInputError = Partial<PostInput>;
