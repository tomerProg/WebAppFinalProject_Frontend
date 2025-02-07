import {
    Avatar,
    Button,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Skeleton,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { isEmpty, repeat } from 'ramda';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../../api/posts/posts.api';
import { ignoreCanceledRequest } from '../../api/utils';
import { styles } from './styles';
import { Post } from '../../api/posts/types';

const PostsPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const { request, abort } = getAllPosts();
        request
            .then(({ data }) => setPosts(data))
            .catch(ignoreCanceledRequest)
            .finally(() => setIsLoading(false));

        return () => abort();
    }, []);

    const onCreatePostClick = () =>
        alert('Implement Create Post functionality!');

    const onPostItemClick = (post: Post) => () => {
        navigate('/post', { state: post });
    };

    return (
        <div className={classes.root}>
            <Typography variant='h4' gutterBottom>
                Posts
            </Typography>
            <Divider />
            {isLoading && <LinearProgress />}
            <List className={classes.postsList}>
                {isLoading ? (
                    repeat(<Skeleton style={{ height: '10%' }} />, 10)
                ) : isEmpty(posts) ? (
                    <Typography variant='h5'>No posts found</Typography>
                ) : (
                    posts.map((post, index) => (
                        <ListItem key={index} onClick={onPostItemClick(post)}>
                            <Paper className={classes.postItem}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={post.imageSrc}
                                        alt={post.owner}
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
                        </ListItem>
                    ))
                )}
            </List>
            <Divider />
            <section className={classes.buttonsSection}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onCreatePostClick}
                >
                    Create Post
                </Button>
            </section>
        </div>
    );
};

export default withStyles(styles)(PostsPage);
