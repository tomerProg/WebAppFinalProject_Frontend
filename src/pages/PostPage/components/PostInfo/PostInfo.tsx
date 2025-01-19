import { TipsAndUpdatesOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { Post } from '../../PostPage';
import { styles } from './styles';

interface PostInfoProps extends WithStyles<typeof styles> {
    post: Post;
}

const BasePostInfo: FunctionComponent<PostInfoProps> = (props) => {
    const { classes, post } = props;

    return (
        <div className={classes.root}>
            <Typography variant='h4'>{post.title}</Typography>
            <section className={classes.description}>
                <Typography variant='subtitle1'>{post.description}</Typography>
            </section>
            <Divider />
            <section className={classes.suggastionPaper}>
                <TipsAndUpdatesOutlined
                    fontSize='small'
                    className={classes.suggastionIcon}
                />
                <Typography
                    variant='subtitle2'
                    className={classes.suggastionText}
                >
                    {post?.suggastion}
                </Typography>
            </section>
        </div>
    );
};

const PostInfo = withStyles(styles)(BasePostInfo);
export default PostInfo;
