import { ChangeEvent } from 'react';
import { PostInput, PostInputError } from '../types';

export const createChangePostInputField =
    (
        setPostInput: React.Dispatch<React.SetStateAction<PostInput>>,
        setPostInputError: React.Dispatch<React.SetStateAction<PostInputError>>
    ) =>
    <K extends keyof PostInput>(field: K) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setPostInput((prev) => ({
            ...prev,
            [field]: value
        }));
        setPostInputError((prev) => ({
            ...prev,
            [field]: undefined
        }));
    };
