import React from 'react';
import { TextField } from '@mui/material';
import { SignInError, SignInInput } from './types';

interface InputFieldsProps{
  setSignInInput: React.Dispatch<React.SetStateAction<SignInInput>>;
  signInInput: SignInInput;
  setSignInError: React.Dispatch<React.SetStateAction<SignInError>>;
  signInError: SignInError;
}

const InputFields: React.FC<InputFieldsProps> = ({setSignInInput, signInInput, setSignInError, signInError}: InputFieldsProps) => {
  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInInput(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (signInError[name as keyof SignInError]) {
      setSignInError(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <>
        <TextField id="email" label="Email Address" name="email" autoComplete="email" margin="normal"
            required fullWidth autoFocus
            value={signInInput.email}
            onChange={onChangeField}
            error={!!signInError.email}
            helperText={signInError.email}
        />
        <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password"
            margin="normal" required fullWidth
            value={signInInput.password}
            onChange={onChangeField}
            error={!!signInError.password}
            helperText={signInError.password}
        />
    </>   
  );
};

export default InputFields;