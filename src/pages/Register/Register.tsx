import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Typography, Container, Link, Paper, Alert} from '@mui/material';
import { RegisterError, RegisterInput } from './components/types';
import { getRegisterError } from './components/utils';
import InputFields from './components/InputFields';
import IconUpload from './components/IconUpload';
import { withStyles, WithStyles } from '@mui/styles';
import { styles } from './components/styles';

const Register: FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;
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
      <Paper elevation={3} className={classes.paper}>
        <Box className={classes.mainBox}>
          <div className={classes.registerTitle}>
            <Typography component="h1" variant="h4"  >
              Register
            </Typography>
          </div>

          {submitError && (<Alert severity="error"> {submitError} </Alert>)}

          <Box component="form" onSubmit={handleSubmit}>
            <IconUpload/>  
            <InputFields 
              setRegisterInput={setRegisterInput} 
              registerInput={registerInput} 
              setRegisterError={setRegisterError}
              registerError={registerError} />
            <div className={classes.frame}>
              <Button type="submit" variant="contained" className={classes.registerButton}  >
                Register
              </Button>
            </div>
            
            <Box className={classes.signInBox}>
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

export default withStyles(styles)(Register);