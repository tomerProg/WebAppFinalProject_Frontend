const posts = [
    {
        title: 'First Post',
        owner: 'John Doe',
        description:
            'This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.This is the first post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    },
    {
        title: 'Second Post',
        owner: 'Jane Smith',
        description: 'This is the second post description.',
        imageSrc: 'https://via.placeholder.com/50',
        likes: [],
        dislikes: []
    }
];

export type Post = {
    title: string;
    owner: string;
    description: string;
    suggastion?: string;
    likes: string[];
    dislikes: string[];
    imageSrc?: string;
};

export const fetchPosts = async (): Promise<Post[]> =>
    new Promise((resolve) => setTimeout(() => resolve(posts), 5_000));
