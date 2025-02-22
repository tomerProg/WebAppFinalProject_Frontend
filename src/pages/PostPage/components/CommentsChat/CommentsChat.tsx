import { Send } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
    getPostComments,
    uploadComment
} from '../../../../api/comments/comment.api';
import { PostComment } from '../../../../api/comments/types';
import { ignoreCanceledRequest } from '../../../../api/utils';
import Comment from './Comment/Comment';
import { styles } from './styles';

interface CommentsChatProps extends WithStyles<typeof styles> {
    postId: string;
}

const BaseCommentsChat: FunctionComponent<CommentsChatProps> = (props) => {
    const { classes, postId } = props;
    const [comments, setComments] = useState<PostComment[]>([]);
    const commentInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const abortControler = new AbortController();
        const refreshComments = () =>
            getPostComments(postId, abortControler)
                .then(({ data: comments }) => {
                    setComments(comments);
                    setTimeout(refreshComments, 1_000);
                })
                .catch(ignoreCanceledRequest);

        refreshComments();

        return () => {
            abortControler.abort();
        };
    }, [postId]);

    const sendComment = async () => {
        if (!commentInputRef.current?.value) {
            return;
        }

        const content = commentInputRef.current?.value.trim();
        const { data: comment } = await uploadComment(postId, content);
        setComments((comments) => comments.concat(comment));
        commentInputRef.current.value = '';
    };

    return (
        <Box id='chat' className={classes.root}>
            <section className={classes.comments}>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </section>
            <section className={classes.commentInput}>
                <OutlinedInput
                    fullWidth
                    multiline
                    inputRef={commentInputRef}
                    maxRows={2}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton onClick={sendComment}>
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </section>
        </Box>
    );
};

const CommentsChat = withStyles(styles)(BaseCommentsChat);
export default CommentsChat;
