import { Avatar, Card, Skeleton, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent } from 'react';
import defaultAvatar from '../../assets/default avatar.png';
import { styles } from './styles';
import { User } from '../../api/users/types';

interface UserCardProps extends WithStyles<typeof styles> {
    user?: User | null;
    className?: string;
}

const BaseUserCard: FunctionComponent<UserCardProps> = (props) => {
    const { classes, user, className } = props;

    return (
        <Card className={clsx(classes.userCard, className)}>
            <Avatar
                className={classes.userAvatar}
                src={user?.profileImage}
                alt={defaultAvatar}
            />
            <section className={classes.userDetailsSection}>
                {user ? (
                    <>
                        <Typography variant='subtitle1'>
                            {user.username}
                        </Typography>
                        <Typography variant='subtitle2'>
                            {user.email}
                        </Typography>
                    </>
                ) : (
                    <>
                        <Skeleton className={classes.skeleton} />
                        <Skeleton className={classes.skeleton} />
                    </>
                )}
            </section>
        </Card>
    );
};

const UserCard = withStyles(styles)(BaseUserCard);
export default UserCard;
