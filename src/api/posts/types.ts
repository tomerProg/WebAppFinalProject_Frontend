import { z } from 'zod';

export const postZodSchema = z.object({
    _id: z.string(),
    title: z.string(),
    owner: z.string(),
    description: z.string(),
    suggestion: z.string().optional(),
    likes: z.array(z.string()).default([]),
    dislikes: z.array(z.string()).default([]),
    imageSrc: z.string().optional()
});
export type Post = z.infer<typeof postZodSchema>;

export type PostForCreation = Pick<Post, 'title' | 'description' | 'imageSrc'>;

export type GetPostsFilter = Partial<{
    owner: string;
    pagination: {
        page: number;
        limit: number;
    };
}>;
