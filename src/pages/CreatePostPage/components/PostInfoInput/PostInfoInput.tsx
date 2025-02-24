import { TextField } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { isNil } from 'ramda';
import { FunctionComponent } from 'react';
import { PostInput, PostInputError } from '../types';
import { styles } from './styles';
import { createChangePostInputField } from './utils';

interface PostInfoProps extends WithStyles<typeof styles> {
    setPostInput: React.Dispatch<React.SetStateAction<PostInput>>;
    postInput: PostInput;
    setPostInputError: React.Dispatch<React.SetStateAction<PostInputError>>;
    postInputError: PostInputError;
}

const PostInfoInput: FunctionComponent<PostInfoProps> = (props) => {
    const {
        setPostInput,
        postInput,
        postInputError,
        setPostInputError,
        classes
    } = props;

    const changePostInputField = createChangePostInputField(
        setPostInput,
        setPostInputError
    );

    return (
        <div className={classes.root}>
            <section className={classes.title}>
                <span className={classes.titleLabel}>Title:</span>
                <TextField
                    value={postInput.title}
                    required
                    variant='standard'
                    fullWidth
                    style={{ fontSize: '5em' }}
                    onChange={changePostInputField('title')}
                    error={!isNil(postInputError.title)}
                    helperText={postInputError.title}
                />
            </section>

            <TextField
                multiline
                value={postInput.description}
                label='Description'
                className={classes.description}
                minRows={5}
                maxRows={15}
                onChange={changePostInputField('description')}
                error={!isNil(postInputError.description)}
                helperText={postInputError.description}
            />
        </div>
    );
};

export default withStyles(styles)(PostInfoInput);
