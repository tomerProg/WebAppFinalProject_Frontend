import { Alert, Box, Button, Divider, Link, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import React, {
    FunctionComponent,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../api/auth/auth-api';
import { SetAccessTokenFunction } from '../../api/auth/types';
import CenteredPage from '../../components/CenteredPage/CenteredPage';
import EntryPaper from '../../components/EntryPaper/EntryPaper';
import IconUpload from './components/IconUpload/IconUpload';
import InputFields from './components/InputFields';
import { RegisterError, RegisterInput } from './components/types';
import { getRegisterError } from './components/utils';
import { styles } from './styles';

interface RegisterProps extends WithStyles<typeof styles> {
    setAccessToken: SetAccessTokenFunction;
}

const Register: FunctionComponent<RegisterProps> = (props) => {
    const { classes, setAccessToken } = props;
    const navigate = useNavigate();

    const [registerInput, setRegisterInput] = useState<RegisterInput>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [registerError, setRegisterError] = useState<RegisterError>({});
    const [submitError, setSubmitError] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File>();

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
            await register(registerInput, profileImage);
            const { data: loginReposne } = await login(
                registerInput.email,
                registerInput.password
            );
            setAccessToken(loginReposne.accessToken);
            navigate('/posts');
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to register. Please try again.');
        }
    };

    return (
        <CenteredPage className={classes.page}>
            <EntryPaper>
                <Box className={classes.registerTitle}>
                    <Typography component='h1' variant='h4'>
                        Register
                    </Typography>
                </Box>
                <Divider />

                {submitError && <Alert severity='error'> {submitError} </Alert>}

                <Box className={classes.mainBox}>
                    <IconUpload setProfileImageFile={setProfileImage} />

                    <Box component='form' onSubmit={handleSubmit}>
                        <InputFields
                            setRegisterInput={setRegisterInput}
                            registerInput={registerInput}
                            setRegisterErrors={setRegisterError}
                            registerError={registerError}
                        />
                    </Box>
                </Box>

                <Divider />
                <Box className={classes.frame}>
                    <Button
                        type='submit'
                        variant='contained'
                        className={classes.registerButton}
                    >
                        Register
                    </Button>
                </Box>
                <Box className={classes.signInBox}>
                    <Link href='/' variant='body2'>
                        Already have an account? Sign In
                    </Link>
                </Box>
            </EntryPaper>
        </CenteredPage>
    );
};

export default withStyles(styles)(Register);
