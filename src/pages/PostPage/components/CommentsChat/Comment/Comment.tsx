import { Avatar, Paper, Typography } from '@mui/material';
import { WithStyles, withStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import defaultAvatar from '../../../../../assets/default avatar.png';
import { fetchUserDetails } from '../../../../../Contexts/UserContext/api';
import {
    User,
    UserContext
} from '../../../../../Contexts/UserContext/UserContext';
import { PostComment } from '../api';
import { styles } from './styles';

interface CommentProps extends WithStyles<typeof styles> {
    comment: PostComment;
}

const BaseComment: FunctionComponent<CommentProps> = (props) => {
    const { classes, comment } = props;
    const { _id: userId } = useContext(UserContext);
    const [commentOwner, setCommentOwner] = useState<User | null>(null);

    useEffect(() => {
        fetchUserDetails(comment.owner).then(setCommentOwner);
    }, [comment.owner]);

    return commentOwner ? (
        <div
            className={clsx(classes.root, {
                [classes.ownComment]: commentOwner._id === userId
            })}
        >
            <Avatar alt={defaultAvatar} src={commentOwner.profileImage} />
            <Paper className={classes.commentContent}>
                <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    margin={'0 4px 8px 4px'}
                >
                    {commentOwner.nickname}
                </Typography>
                <Typography whiteSpace={'pre-line'} variant='body2'>{comment.content}</Typography>
            </Paper>
        </div>
    ): null;
};

const Comment = withStyles(styles)(BaseComment);
export default Comment;
