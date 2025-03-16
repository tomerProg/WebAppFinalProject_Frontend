import { Divider, List, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, useEffect, useState } from 'react';
import { getPosts } from '../../api/posts/posts.api';
import { Post } from '../../api/posts/types';
import { User } from '../../api/users/types';
import { getMyUser } from '../../api/users/users.api';
import PostListItem from '../PostsList/components/PostListItem/PostListItem';
import UserProfile from './components/UserProfile/UserProfile';
import { styles } from './styles';

const UserProfilePage: FunctionComponent<WithStyles<typeof styles>> = (
    props
) => {
    const { classes } = props;
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const { request, abort } = getMyUser();
        request.then(({ data: user }) => setUser(user));

        return () => abort();
    }, []);

    useEffect(() => {
        if (user) {
            const { request, abort } = getPosts({ owner: user._id });
            request.then(({ data: posts }) => setUserPosts(posts));

            return () => abort();
        }
    }, [user]);

    return (
        <div className={classes.root}>
            <section className={classes.postsPannel}>
                <section className={classes.postsTitle}>
                    <Typography variant='h6'>My Posts</Typography>
                    <Typography variant='caption'>
                        {userPosts.length} posts
                    </Typography>
                </section>
                <Divider />
                <List className={classes.postsList}>
                    {userPosts.map((post) => (
                        <PostListItem key={post._id} post={post} isEditable />
                    ))}
                </List>
                <Divider />
            </section>

            <section className={classes.profilePannel}>
                <UserProfile user={user} setUser={setUser} />
            </section>
        </div>
    );
};

export default withStyles(styles)(UserProfilePage);
