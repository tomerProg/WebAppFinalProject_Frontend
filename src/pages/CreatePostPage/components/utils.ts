import { PostInput, PostInputError } from "./types";

export const getPostInputError = (postInput: PostInput): PostInputError => {
    const newErrors: PostInputError = {};
    
    if (!postInput.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!postInput.description.trim()) {
      newErrors.description = 'Description is required';
    } 
    
    return newErrors;
  };