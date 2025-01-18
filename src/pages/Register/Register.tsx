import React, { useState } from 'react';
import { Box, Button, Typography, Container, Link, Paper, Alert} from '@mui/material';
import { RegisterError, RegisterInput } from './components/types';
import './Register.css'
import { getRegisterError } from './components/utils';
import InputFields from './components/InputFields';

const Register: React.FC = () => {
  const [registerInput, setRegisterInput] = useState<RegisterInput>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
  });
  const [registerError, setRegisterError] = useState<RegisterError>({});
  const [submitError, setSubmitError] = useState<string>('');

  const isValidRegisterInput = (): boolean => {
    const newError = getRegisterError(registerInput);
    setRegisterError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!isValidRegisterInput()) {
      return;
    }

    try {
      console.log('Registration data:', registerInput);
    } catch (error) {
      setSubmitError('Failed to register. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="paper">
        <Box className="main-box">
          <Typography component="h1" variant="h5">
            Register
          </Typography>          
          {submitError && (<Alert severity="error"> {submitError} </Alert>)}

          <Box component="form" onSubmit={handleSubmit}>
            <InputFields 
              setRegisterInput={setRegisterInput} 
              registerInput={registerInput} 
              setRegisterError={setRegisterError}
              registerError={registerError} />
            <Button type="submit" variant="contained" fullWidth className='submit-button'>
              Register
            </Button>
            <Box className='sign-in-box'>
              <Link href="/" variant="body2">
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;