import { Edit } from '@mui/icons-material';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, Key as ReactKey, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../../../api/posts/types';
import { User } from '../../../../api/users/types';
import { getUserById } from '../../../../api/users/users.api';
import { ignoreCanceledRequest } from '../../../../api/utils';
import { PAGES_ROUTES } from '../../../../routes/routes.const';
import { PostPageLocationState } from '../../../PostPage/PostPage';
import { styles } from './styles';

interface PostListItemProps extends WithStyles<typeof styles> {
    key?: ReactKey;
    post: Post;
    isEditable?: boolean;
}

const PostListItem: FunctionComponent<PostListItemProps> = (props) => {
    const { key, post, classes, isEditable = false } = props;
    const navigate = useNavigate();
    const [postOwner, setPostOwner] = useState<User>();

    useEffect(() => {
        const { request, abort } = getUserById(post.owner);
        request
            .then(({ data: owner }) => setPostOwner(owner))
            .catch(ignoreCanceledRequest);

        return () => abort();
    }, [post]);

    const onPostItemClick = () => {
        const postPageState: PostPageLocationState = { post, owner: postOwner };
        navigate(PAGES_ROUTES.POST, { state: postPageState });
    };

    const editPost = () => {
        navigate(PAGES_ROUTES.CREATE_POST, { state: { post } });
    };

    return (
        <ListItem key={key}>
            <Paper className={classes.postItem} onClick={onPostItemClick}>
                <ListItemAvatar>
                    <Avatar
                        src={postOwner?.profileImage}
                        alt={postOwner?.username}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={<strong>{post.title}</strong>}
                    secondary={
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            className={classes.postDescription}
                        >
                            {post.description}
                        </Typography>
                    }
                />
            </Paper>
            {isEditable && (
                <IconButton
                    sx={{
                        borderRadius: '4px',
                        padding: '5px',
                        margin: '4px 12px'
                    }}
                    onClick={editPost}
                >
                    <Edit htmlColor='black' />
                </IconButton>
            )}
        </ListItem>
    );
};

export default withStyles(styles)(PostListItem);
