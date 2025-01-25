import { SignInError, SignInInput } from "./types";

export const getSignInError = (signInInput: SignInInput) : SignInError => {
    const signInError: SignInError = {};
    
    if (!signInInput.email) {
      signInError.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInInput.email)) {
      signInError.email = 'Invalid email format';
    }
    
    if (!signInInput.password) {
      signInError.password = 'Password is required';
    } else if (signInInput.password.length < 6) {
      signInError.password = 'Password must be at least 6 characters';
    }
    return signInError;
}