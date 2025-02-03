import {
    Alert,
    Box,
    Button,
    Container,
    Link,
    Paper,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../api/auth/auth-api';
import { UserWithPassword } from '../../api/auth/types';
import IconUpload from './components/IconUpload/IconUpload';
import InputFields from './components/InputFields';
import { RegisterError, RegisterInput } from './components/types';
import { getRegisterError } from './components/utils';
import { styles } from './styles';
import { uploadProfileImage } from '../../api/users/users.api';

const Register: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();

    const [registerInput, setRegisterInput] = useState<RegisterInput>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [registerError, setRegisterError] = useState<RegisterError>({});
    const [submitError, setSubmitError] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const isValidRegisterInput = (): boolean => {
        const newError = getRegisterError(registerInput);
        setRegisterError(newError);
        return Object.keys(newError).length === 0;
    };

    const tryUploadProfileFile = useCallback(async () => {
        if (!profileImage) return undefined;

        try {
            const { data: imageUrl } = await uploadProfileImage(profileImage);
            return imageUrl;
        } catch (error) {
            console.error('failed uploading profile image', error);
            return undefined;
        }
    }, [profileImage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!isValidRegisterInput()) {
            return;
        }

        const profileImageUrl = await tryUploadProfileFile();
        const userToRegister: UserWithPassword = {
            email: registerInput.email,
            password: registerInput.password,
            username: registerInput.userName,
            profileImage: profileImageUrl
        };

        try {
            await register(userToRegister).then(() =>
                login(userToRegister.email, userToRegister.password)
            );
            navigate('/posts');
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to register. Please try again.');
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3} className={classes.paper}>
                <Box className={classes.mainBox}>
                    <div className={classes.registerTitle}>
                        <Typography component='h1' variant='h4'>
                            Register
                        </Typography>
                    </div>

                    {submitError && (
                        <Alert severity='error'> {submitError} </Alert>
                    )}

                    <Box component='form' onSubmit={handleSubmit}>
                        <IconUpload setProfileImageFile={setProfileImage} />
                        <InputFields
                            setRegisterInput={setRegisterInput}
                            registerInput={registerInput}
                            setRegisterError={setRegisterError}
                            registerError={registerError}
                        />
                        <div className={classes.frame}>
                            <Button
                                type='submit'
                                variant='contained'
                                className={classes.registerButton}
                            >
                                Register
                            </Button>
                        </div>

                        <Box className={classes.signInBox}>
                            <Link href='/' variant='body2'>
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
