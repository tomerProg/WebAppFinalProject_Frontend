import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Link,
    Paper,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { isEmpty } from 'ramda';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../../api/auth/auth-api';
import InputFields from './components/InputFields';
import { SignInError, SignInInput } from './components/types';
import { getSignInError } from './components/utils';
import { styles } from './styles';

const SignIn: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();

    const [signInInput, setSignInInput] = useState<SignInInput>({
        email: '',
        password: ''
    });

    const [signInError, setSignInError] = useState<SignInError>({});
    const [submitError, setSubmitError] = useState<string>('');

    const checkInput = (): boolean => {
        const newError: SignInError = getSignInError(signInInput);

        setSignInError(newError);
        return isEmpty(newError);
    };

    const onGoogleAuthError = () => {
        alert('failed login via google');
    };
    const onGoogleSubmit = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            return onGoogleAuthError();
        }

        await loginWithGoogle(credentialResponse.credential);
        navigate('/posts');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!checkInput()) {
            return;
        }

        try {
            await login(signInInput.email, signInInput.password);
            navigate('/posts');
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to sign in. Please try again.');
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3} className={classes.paper}>
                <Box className={classes.mainBox}>
                    <Typography component='h1' variant='h4'>
                        Sign In
                    </Typography>

                    {submitError && (
                        <Alert severity='error'> {submitError} </Alert>
                    )}

                    <Box component='form' onSubmit={handleSubmit}>
                        <InputFields
                            setSignInInput={setSignInInput}
                            signInInput={signInInput}
                            setSignInError={setSignInError}
                            signInError={signInError}
                        />
                        <div className={classes.signinActions}>
                            <Button
                                type='submit'
                                variant='contained'
                                className={classes.signInButton}
                            >
                                Sign In
                            </Button>
                            <Divider className={classes.actionsDivider} />
                            <GoogleLogin
                                locale='en'
                                containerProps={{
                                    className: classes.googleBtn
                                }}
                                useOneTap
                                text='continue_with'
                                onSuccess={onGoogleSubmit}
                                onError={onGoogleAuthError}
                            />
                            <Divider />
                        </div>

                        <Box className={classes.registerBox}>
                            <Link href='/register' variant='body2'>
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
