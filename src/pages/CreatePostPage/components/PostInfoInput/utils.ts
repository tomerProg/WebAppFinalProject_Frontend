import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { PostInput, PostInputError } from '../types';

export const createChangePostInputField =
    (
        setPostInput: Dispatch<SetStateAction<PostInput>>,
        setPostInputError: Dispatch<SetStateAction<PostInputError>>
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
