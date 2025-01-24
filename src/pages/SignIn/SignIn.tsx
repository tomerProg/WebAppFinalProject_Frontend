import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Typography, Container, Link, Paper,  Alert} from '@mui/material';
import { SignInInput, SignInError } from './components/types';
import { getSignInError } from './components/utils';
import InputFields from './components/InputFields';
import { withStyles, WithStyles } from '@mui/styles';
import { styles } from './styles';

const SignIn: FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;

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
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Box className={classes.mainBox}>
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>
          
          {submitError && (<Alert severity="error"> {submitError} </Alert>)}

          <Box component="form" onSubmit={handleSubmit}>
            <InputFields 
              setSignInInput={setSignInInput} 
              signInInput={signInInput} 
              setSignInError={setSignInError} 
              signInError={signInError} />
            <div className={classes.frame}> 
              <Button type="submit" variant="contained" className={classes.signInButton}>
                Sign In
              </Button>
            </div>
            
            <Box className={classes.registerBox}>
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

export default withStyles(styles)(SignIn);
