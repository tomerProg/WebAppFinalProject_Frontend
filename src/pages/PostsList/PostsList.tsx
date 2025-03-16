import {
    Button,
    Divider,
    LinearProgress,
    List,
    Skeleton,
    Typography
} from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { isEmpty, repeat } from 'ramda';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../api/posts/posts.api';
import { Post } from '../../api/posts/types';
import { ignoreCanceledRequest } from '../../api/utils';
import { PAGES_ROUTES } from '../../routes/routes.const';
import PostListItem from './components/PostListItem/PostListItem';
import { styles } from './styles';

const PostsPage: FunctionComponent<WithStyles<typeof styles>> = (props) => {
    const { classes } = props;
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const { request, abort } = getPosts();
        request
            .then(({ data }) => setPosts(data))
            .catch(ignoreCanceledRequest)
            .finally(() => setIsLoading(false));

        return () => abort();
    }, []);

    const onCreatePostClick = () => navigate(PAGES_ROUTES.CREATE_POST);

    return (
        <div className={classes.root}>
            <Typography variant='h4' gutterBottom>
                Posts
            </Typography>
            <Divider />
            {isLoading && <LinearProgress />}
            <List className={classes.postsList}>
                {isLoading ? (
                    repeat(0, 10).map((_val, index) => (
                        <Skeleton key={index} style={{ height: '10%' }} />
                    ))
                ) : isEmpty(posts) ? (
                    <Typography variant='h5'>No posts found</Typography>
                ) : (
                    posts.map((post, index) => (
                        <PostListItem post={post} key={index} />
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
