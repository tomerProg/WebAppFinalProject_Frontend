import React, { FunctionComponent } from 'react';
import { TextField, useMediaQuery } from '@mui/material';
import { RegisterInput, RegisterError } from './types';
import { useTheme } from "@mui/material/styles";

interface InputFieldsProps{
  setRegisterInput: React.Dispatch<React.SetStateAction<RegisterInput>>;
  registerInput: RegisterInput;
  setRegisterErrors: React.Dispatch<React.SetStateAction<RegisterError>>;
  registerError: RegisterError;
}

const InputFields: FunctionComponent<InputFieldsProps> = ({setRegisterInput, registerInput, setRegisterErrors, registerError}: InputFieldsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 
  
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
      <TextField id="userName" label="Username" name="userName" autoComplete="userName" 
        required fullWidth autoFocus 
        value={registerInput.userName}
        onChange={onChangeField}
        error={!!registerError.userName}
        helperText={registerError.userName}
        size={isSmallScreen ? "small" : "medium"}
        margin={isSmallScreen ? "dense" : "normal"}
      />
      <TextField id="email" label="Email Address" name="email" autoComplete="email"
        required fullWidth
        value={registerInput.email}
        onChange={onChangeField}
        error={!!registerError.email}
        helperText={registerError.email}
        size={isSmallScreen ? "small" : "medium"}
        margin={isSmallScreen ? "dense" : "normal"}
      />
      <TextField id="password" label="Password" name="password" type="password" autoComplete="new-password"
        required fullWidth 
        value={registerInput.password}
        onChange={onChangeField}
        error={!!registerError.password}
        helperText={registerError.password}
        size={isSmallScreen ? "small" : "medium"}
        margin={isSmallScreen ? "dense" : "normal"}
      />
      <TextField id="confirmPassword" label="Confirm Password" name="confirmPassword" type="password"
        autoComplete="new-password" required fullWidth
        value={registerInput.confirmPassword}
        onChange={onChangeField}
        error={!!registerError.confirmPassword}
        helperText={registerError.confirmPassword}
        size={isSmallScreen ? "small" : "medium"}
        margin={isSmallScreen ? "dense" : "normal"}
      />
    </>   
  );
};

export default InputFields;
