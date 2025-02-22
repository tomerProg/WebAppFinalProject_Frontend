import { Divider, FormControl, FormHelperText, Input, InputLabel, } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent} from 'react';
import { styles } from './styles';
import { PostInput, PostInputError } from '../types';

interface PostInfoProps extends WithStyles<typeof styles> {
    setPostInput: React.Dispatch<React.SetStateAction<PostInput>>;
    postInput: PostInput;
    setPostInputError: React.Dispatch<React.SetStateAction<PostInputError>>;
    postInputError: PostInputError
}

const PostInfoInput: FunctionComponent<PostInfoProps> = (props) => {
    const { setPostInput, postInput, 
        postInputError, setPostInputError, classes } = props;
    
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostInput(prev => ({
          ...prev,
          [name]: value
        }))
        setPostInputError(prev => ({
            ...prev,
            [name]: undefined
          }))
    };


    return (
        <div className={classes.root}>
            <FormControl margin='normal' fullWidth variant="outlined" error={!!postInputError.title}>
                <InputLabel htmlFor="title" 
                    sx={{ fontSize: (theme) => theme.typography.h4.fontSize,
                                                padding: "3px", 
                    }}
                >
                    Title
                </InputLabel>
                
                <Input id="title" name="title" 
                    value={postInput.title}
                    onChange={onChangeField} 
                    sx = {{
                        "& .MuiInputBase-input": {
                        fontSize: (theme) => theme.typography.h4.fontSize, 
                        padding: "3px",  
                        },
                    }}
                />
                {!!postInputError.title && <FormHelperText>{postInputError.title}</FormHelperText>}
            </FormControl>
            
            <FormControl margin='normal' className={classes.description} error={!!postInputError.description}>
                <InputLabel htmlFor="description"                  
                 sx={{ fontSize: (theme) => theme.typography.subtitle1.fontSize,
                                                padding: "10px", 
                    }}
                >
                    Description
                </InputLabel>
                
                <Input id="description" name="description" 
                    value={postInput.description}
                    onChange={onChangeField} 
                    sx = {{
                        "& .MuiInputBase-input": {
                        fontSize: (theme) => theme.typography.subtitle1.fontSize, 
                        padding: "10px",  
                        },
                    }}        
                />
                {!!postInputError.description && <FormHelperText>{postInputError.description}</FormHelperText>}
            </FormControl>
            
            <Divider />
        </div>
    );
};

export default withStyles(styles)(PostInfoInput);
