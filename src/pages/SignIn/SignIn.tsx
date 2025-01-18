import React, { useState } from 'react';
import { Box, Button, Typography, Container, Link, Paper,  Alert} from '@mui/material';
import { SignInInput, SignInError } from './components/types';
import { getSignInError } from './components/utils';
import InputFields from './components/InputFields';
import './SignIn.css'
export const SignIn: React.FC = () => {
  const [signInInput, setSignInInput] = useState<SignInInput>({
    email: '',
    password: '',
  });
  
  const [signInError, setSignInError] = useState<SignInError>({});
  const [submitError, setSubmitError] = useState<string>('');

  const checkInput = (): boolean => {
    const newError: SignInError = getSignInError(signInInput);
    
    setSignInError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!checkInput()) {
      return;
    }

    try {
      console.log('Sign in data:', signInInput);
    } catch (error) {
      setSubmitError('Failed to sign in. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Paper elevation={3} className='paper'>
        <Box className='main-box'>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          
          {submitError && (<Alert severity="error"> {submitError} </Alert>)}

          <Box component="form" onSubmit={handleSubmit}>
            <InputFields 
              setSignInInput={setSignInInput} 
              signInInput={signInInput} 
              setSignInError={setSignInError} 
              signInError={signInError} />
            <Button type="submit" fullWidth variant="contained" className='submit-button'>
              Sign In
            </Button>
            <Box className='register-box'>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};