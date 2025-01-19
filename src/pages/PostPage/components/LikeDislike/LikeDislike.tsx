import {
    ThumbDownAlt,
    ThumbDownAltOutlined,
    ThumbUp,
    ThumbUpOutlined
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { WithStyles, withStyles } from '@mui/styles';
import { FunctionComponent, MouseEventHandler } from 'react';
import { styles } from './styles';

interface LikeDislikeProps extends WithStyles<typeof styles> {
    isLiked: boolean | null;
    onDislikeClick: MouseEventHandler;
    onLikeClick: MouseEventHandler;
}

const BaseLikeDislike: FunctionComponent<LikeDislikeProps> = (props) => {
    const { classes, isLiked, onDislikeClick, onLikeClick } = props;

    return (
        <section className={classes.likeBtnSection}>
            <IconButton
                onClick={onDislikeClick}
                size='medium'
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                }}
            >
                {isLiked === false ? (
                    <ThumbDownAlt className={classes.likeIcon} color='error' />
                ) : (
                    <ThumbDownAltOutlined className={classes.likeIcon} />
                )}
            </IconButton>
            <IconButton
                onClick={onLikeClick}
                size='medium'
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                }}
            >
                {isLiked === true ? (
                    <ThumbUp className={classes.likeIcon} color='primary' />
                ) : (
                    <ThumbUpOutlined className={classes.likeIcon} />
                )}
            </IconButton>
        </section>
    );
};

const LikeDislike = withStyles(styles)(BaseLikeDislike);
export default LikeDislike;
