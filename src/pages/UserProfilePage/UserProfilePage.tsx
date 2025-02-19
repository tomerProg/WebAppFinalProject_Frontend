import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Box,
    Button,
    Card,
    IconButton,
    Skeleton,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { User } from '../../api/users/types';
import { getMyUser, updateUser } from '../../api/users/users.api';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';

const UserProfilePage: FunctionComponent<WithStyles<typeof styles>> = (
    props
) => {
    const { classes } = props;
    const [user, setUser] = useState<User>();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState<string>();
    const [profileImageUrl, setProfileImageUrl] = useState<string>();
    const [imageFile, setImageFile] = useState<File>();
    const navigate = useNavigate();

    useEffect(() => {
        const { request, abort } = getMyUser();
        request.then(({ data: user }) => setUser(user));

        return () => abort();
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setProfileImageUrl(user.profileImageUrl);
        }
    }, [user]);

    const stopEdit = () => {
        setImageFile(undefined);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            if (username) {
                const { data: updatedUser } = await updateUser(
                    username,
                    imageFile
                );
                setUser({ ...user, ...updatedUser });
            }
        } finally {
            stopEdit();
        }
    };

    const handleCancel = () => {
        if (user) {
            setUsername(user.username);
            setProfileImageUrl(user.profileImageUrl);
        }
        stopEdit();
    };

    const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImageUrl(imageUrl);
            setImageFile(file);
        }
    };

    const navigatePreviousRoute = () =>{
        navigate(-1);
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography variant='h4' gutterBottom>
                    User Profile
                </Typography>

                <div className={classes.profileImageDiv}>
                    <Avatar
                        src={profileImageUrl}
                        alt=''
                        sx={{ width: 150, height: 150, mb: 2, fontSize: '3em' }}
                    />
                    {isEditing && (
                        <IconButton
                            component='label'
                            className={classes.imageEditIcon}
                            sx={{ position: 'absolute' }}
                        >
                            <EditIcon />
                            <input
                                type='file'
                                accept='image/*'
                                hidden
                                onChange={handleProfileImageChange}
                            />
                        </IconButton>
                    )}
                </div>

                <Typography
                    className={classes.userTextProperty}
                    variant='subtitle1'
                    color='textSecondary'
                >
                    {user ? user.email : <Skeleton />}
                </Typography>
                {isEditing ? (
                    <TextField
                        label='Username'
                        variant='outlined'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                ) : (
                    <Typography
                        className={classes.userTextProperty}
                        variant='h6'
                    >
                        {user ? user.username : <Skeleton />}
                    </Typography>
                )}
            </Card>
            {isEditing ? (
                <Box display='flex' gap={2} mt={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Stack direction="row" spacing={2}>
                    <Button
                    variant='contained'
                    color='primary'
                    onClick={navigatePreviousRoute}
                    sx={{ mt: 3 }}
                    >
                        Back
                    </Button>

                    <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setIsEditing(true)}
                    sx={{ mt: 3 }}
                    >
                        Edit Profile
                    </Button>
                
                </Stack>
                
            )}
        </div>
    );
};

export default withStyles(styles)(UserProfilePage);
