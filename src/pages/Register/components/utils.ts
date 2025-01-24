import { RegisterInput, RegisterError } from "./types";

export const getRegisterError = (registerInput: RegisterInput): RegisterError => {
    const newErrors: RegisterError = {};
    
    if (!registerInput.userName.trim()) {
      newErrors.userName = 'Name is required';
    }

    if (!registerInput.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerInput.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!registerInput.password) {
      newErrors.password = 'Password is required';
    } else if (registerInput.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!registerInput.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerInput.password !== registerInput.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };