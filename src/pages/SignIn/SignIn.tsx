import {
    Alert,
    Box,
    Button,
    Divider,
    Link,
    Paper,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { GoogleLogin } from '@react-oauth/google';
import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState
} from 'react';
import CenteredPage from '../../components/CenteredPage/CenteredPage';
import InputFields from './components/InputFields';
import { SignInError, SignInInput } from './components/types';
import { getSignInError } from './components/utils';
import { styles } from './styles';
import { loginWithGoogle } from './utils';

interface SignInProps extends WithStyles<typeof styles> {
    setUserId?: Dispatch<SetStateAction<string>>;
}
const SignIn: FunctionComponent<SignInProps> = (props) => {
    const { classes, setUserId } = props;

    const [signInInput, setSignInInput] = useState<SignInInput>({
        email: '',
        password: ''
    });

    const [signInError, setSignInError] = useState<SignInError>({});
    const [submitError, setSubmitError] = useState<string>('');

    const checkInput = (): boolean => {
        const newError: SignInError = getSignInError(signInInput);

        setSignInError(newError);
        return Object.keys(newError).length === 0;
    };
    const onGoogleAuthError = () => {
        console.error('failed login via google');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!checkInput()) {
            return;
        }

        try {
            console.log('Sign in data:', signInInput);
            if (setUserId) {
                setUserId('userIdefdwgwre');
            }
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to sign in. Please try again.');
        }
    };

    return (
        <CenteredPage>
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
                                onSuccess={loginWithGoogle}
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
        </CenteredPage>
    );
};

export default withStyles(styles)(SignIn);
