import React, { useState } from 'react';
import { Box, Button, Typography, Container, Link, Paper, Alert} from '@mui/material';
import { RegisterError, RegisterInput } from './components/types';
import { getRegisterError } from './components/utils';
import InputFields from './components/InputFields';
import IconUpload from './components/IconUpload';

const Register: React.FC = () => {
  const [registerInput, setRegisterInput] = useState<RegisterInput>({
      userName: '',
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
      <Paper elevation={3} sx={{p: 4}}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography component="h1" variant="h4" marginBottom={3}>
            Register
          </Typography>          
          {submitError && (<Alert severity="error"> {submitError} </Alert>)}

          <Box component="form" onSubmit={handleSubmit}>
            <IconUpload/>
            <InputFields 
              setRegisterInput={setRegisterInput} 
              registerInput={registerInput} 
              setRegisterError={setRegisterError}
              registerError={registerError} />
            <Button type="submit" variant="contained" fullWidth sx={{mb: 3, mt: 3}} >
              Register
            </Button>
            <Box textAlign={'center'}>
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