import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Box,
    Button,
    Card,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import defaultAvatar from '../../assets/default avatar.png';
import { styles } from './styles';

// Define the user type
interface User {
    email: string;
    username: string;
    profileImageUrl?: string;
}

const UserProfilePage: FunctionComponent<WithStyles<typeof styles>> = (
    props
) => {
    const { classes } = props;
    const [user, setUser] = useState<User>({
        email: 'user@example.com',
        username: 'JohnDoe',
        profileImageUrl: 'https://via.placeholder.com/150'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [profileImageUrl, setProfileImageUrl] = useState(
        user.profileImageUrl
    );

    const handleSave = () => {
        setUser((prevUser) => ({
            ...prevUser,
            username,
            profileImageUrl
        }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setUsername(user.username);
        setProfileImageUrl(user.profileImageUrl);
        setIsEditing(false);
    };

    const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImageUrl(imageUrl);
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography variant='h4' gutterBottom>
                    User Profile
                </Typography>

                <div className={classes.profileImage}>
                    <Avatar
                        src={profileImageUrl ?? defaultAvatar}
                        alt={user.username}
                        sx={{ width: 150, height: 150, mb: 2, fontSize: '3em' }}
                    />
                    {isEditing && (
                        <IconButton
                            component='label'
                            sx={{ position: 'absolute', bottom: 0, right: 0 }}
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

                <Typography variant='subtitle1' color='textSecondary'>
                    Email: {user.email}
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
                    <Typography variant='h6' sx={{ mt: 2 }}>
                        {user.username}
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
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setIsEditing(true)}
                    sx={{ mt: 3 }}
                >
                    Edit Profile
                </Button>
            )}
        </div>
    );
};

export default withStyles(styles)(UserProfilePage);
