import React from 'react';
import { TextField } from '@mui/material';
import { RegisterInput, RegisterError } from './types';
import IconUpload from './IconUpload';

interface InputFieldsProps{
  setRegisterInput: React.Dispatch<React.SetStateAction<RegisterInput>>;
  registerInput: RegisterInput;
  setRegisterError: React.Dispatch<React.SetStateAction<RegisterError>>;
  registerError: RegisterError;
}

const InputFields: React.FC<InputFieldsProps> = ({setRegisterInput, registerInput, setRegisterError: setRegisterErrors, registerError: registerError}: InputFieldsProps) => {
  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInput(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (registerError[name as keyof RegisterError]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <>
      <TextField id="userName" label="Full Name" name="userName" autoComplete="userName" margin="normal"
        required fullWidth autoFocus
        value={registerInput.userName}
        onChange={onChangeField}
        error={!!registerError.userName}
        helperText={registerError.userName}
      />
      <TextField id="email" label="Email Address" name="email" autoComplete="email" margin="normal"
        required fullWidth
        value={registerInput.email}
        onChange={onChangeField}
        error={!!registerError.email}
        helperText={registerError.email}
      />
      <TextField id="password" label="Password" name="password" type="password" autoComplete="new-password"
        margin="normal" required fullWidth
        value={registerInput.password}
        onChange={onChangeField}
        error={!!registerError.password}
        helperText={registerError.password}
      />
      <TextField id="confirmPassword" label="Confirm Password" name="confirmPassword" type="password"
        autoComplete="new-password" margin="normal" required fullWidth
        value={registerInput.confirmPassword}
        onChange={onChangeField}
        error={!!registerError.confirmPassword}
        helperText={registerError.confirmPassword}
      />
    </>   
  );
};

export default InputFields;