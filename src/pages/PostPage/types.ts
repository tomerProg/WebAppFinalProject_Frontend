export type Post = {
    _id: string;
    title: string;
    owner: string;
    description: string;
    suggastion: string;
    likes: string[];
    dislikes: string[];
    postImage?: string;
};
