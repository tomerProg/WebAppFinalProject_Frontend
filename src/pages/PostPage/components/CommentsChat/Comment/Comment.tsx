import { Avatar, Paper, Skeleton, Typography } from '@mui/material';
import { WithStyles, withStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent, useEffect, useState } from 'react';
import { PostComment } from '../../../../../api/comments/types';
import { User } from '../../../../../api/users/types';
import { getUserById } from '../../../../../api/users/users.api';
import { ignoreCanceledRequest } from '../../../../../api/utils';
import { styles } from './styles';

interface CommentProps extends WithStyles<typeof styles> {
    loggedUserId: string;
    comment: PostComment;
}

const Comment: FunctionComponent<CommentProps> = (props) => {
    const { classes, comment, loggedUserId } = props;
    const [commentOwner, setCommentOwner] = useState<User | null>(null);

    useEffect(() => {
        const { request, abort } = getUserById(comment.owner);
        request
            .then(({ data }) => setCommentOwner(data))
            .catch(ignoreCanceledRequest);

        return () => abort();
    }, [comment.owner]);

    return (
        <div
            className={clsx(classes.root, {
                [classes.ownComment]:
                    comment.isUserTheOwner || comment.owner === loggedUserId
            })}
        >
            <Avatar
                alt={commentOwner?.username}
                src={commentOwner?.profileImage}
            />
            <Paper className={classes.commentContent}>
                {commentOwner ? (
                    <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        margin={'0 4px 8px 4px'}
                    >
                        {commentOwner.username}
                    </Typography>
                ) : (
                    <Skeleton />
                )}
                <Typography whiteSpace={'pre-line'} variant='body2'>
                    {comment.content}
                </Typography>
            </Paper>
        </div>
    );
};

export default withStyles(styles)(Comment);
