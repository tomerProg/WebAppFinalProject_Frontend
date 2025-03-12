import { Alert, Box, Button, Divider, Link, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { isEmpty } from 'ramda';
import {
    FunctionComponent,
    useCallback,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../../api/auth/auth-api';
import { LoginResponse, SetAccessTokenFunction } from '../../api/auth/types';
import { useAlertSnackbar } from '../../components/AlertSnackbar/globalProvider';
import CenteredPage from '../../components/CenteredPage/CenteredPage';
import EntryPaper from '../../components/EntryPaper/EntryPaper';
import { PAGES_ROUTES } from '../../routes/routes.const';
import InputFields from './components/InputFields';
import { SignInError, SignInInput } from './components/types';
import { getSignInError } from './components/utils';
import { styles } from './styles';

interface SignInProps extends WithStyles<typeof styles> {
    setAccessToken: SetAccessTokenFunction;
}

const SignIn: FunctionComponent<SignInProps> = (props) => {
    const { classes, setAccessToken } = props;
    const navigate = useNavigate();
    const { showSnackbar } = useAlertSnackbar();

    const [signInInput, setSignInInput] = useState<SignInInput>({
        email: '',
        password: ''
    });
    const [signInError, setSignInError] = useState<SignInError>({});
    const [submitError, setSubmitError] = useState<string>('');

    const handleSuccessLogin = useCallback(
        (loginResponse: LoginResponse) => {
            setAccessToken(loginResponse.accessToken);
            navigate(PAGES_ROUTES.POSTS_LIST);
        },
        [setAccessToken, navigate]
    );

    const checkInput = (): boolean => {
        const newError: SignInError = getSignInError(signInInput);

        setSignInError(newError);
        return isEmpty(newError);
    };

    const onGoogleAuthError = () => {
        showSnackbar('failed login via google');
    };

    const onGoogleSubmit = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            return onGoogleAuthError();
        }

        const { data: loginResponse } = await loginWithGoogle(
            credentialResponse.credential
        );
        handleSuccessLogin(loginResponse);
    };

    const submitLogin = async () => {
        setSubmitError('');

        if (!checkInput()) {
            return;
        }

        try {
            const { data: loginResponse } = await login(
                signInInput.email,
                signInInput.password
            );
            handleSuccessLogin(loginResponse);
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to sign in. Please try again.');
        }
    };

    return (
        <CenteredPage className={classes.page}>
            <EntryPaper>
                <Box className={classes.mainBox}>
                    <Typography component='h1' variant='h4'>
                        Sign In
                    </Typography>

                    {submitError && (
                        <Alert severity='error'> {submitError} </Alert>
                    )}

                    <Box>
                        <InputFields
                            setSignInInput={setSignInInput}
                            signInInput={signInInput}
                            setSignInError={setSignInError}
                            signInError={signInError}
                        />
                        <div className={classes.signinActions}>
                            <Button
                                variant='contained'
                                className={classes.signInButton}
                                onClick={submitLogin}
                            >
                                Sign In
                            </Button>
                            <Divider className={classes.actionsDivider} />
                            <GoogleLogin
                                locale='en'
                                containerProps={{
                                    className: classes.googleBtn
                                }}
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
            </EntryPaper>
        </CenteredPage>
    );
};

export default withStyles(styles)(SignIn);
