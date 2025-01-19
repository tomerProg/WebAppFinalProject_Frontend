import { Send } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { fetchPostComments, PostComment, uploadComment } from './api';
import Comment from './Comment/Comment';
import { styles } from './styles';

interface CommentsChatProps extends WithStyles<typeof styles> {
    postId: string;
}

const BaseCommentsChat: FunctionComponent<CommentsChatProps> = (props) => {
    const { classes, postId } = props;
    const user = useContext(UserContext);
    const [comments, setComments] = useState<PostComment[]>([]);
    const commentInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchPostComments(postId).then(setComments);
    }, [postId]);

    const sendComment = async () => {
        if (!commentInputRef.current?.value) {
            return;
        }

        const content = commentInputRef.current?.value.trim();
        await uploadComment(content);
        const { _id: userId } = user;
        const comment: PostComment = {
            owner: userId,
            content
        };
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
