import { TipsAndUpdatesOutlined } from '@mui/icons-material';
import { Divider, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent} from 'react';
import { styles } from './styles';
import { Post } from '../../../../api/posts/types';

interface PostInfoProps extends WithStyles<typeof styles> {
    setPost: React.Dispatch<React.SetStateAction<Post>>;
    post: Post;
}

const BasePostInfo: FunctionComponent<PostInfoProps> = (props) => {
    const { setPost, post, classes } = props;
    
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPost(prev => ({
          ...prev,
          [name]: value
        }))};

    return (
        <div className={classes.root}>
            <FormControl margin='normal' fullWidth variant="outlined">
                <InputLabel htmlFor="title" 
                    sx={{ fontSize: (theme) => theme.typography.h4.fontSize,
                                                padding: "3px", 
                    }}
                >
                    Title
                </InputLabel>
                
                <Input id="title" name="title" 
                    value={post.title}
                    onChange={onChangeField} 
                    sx = {{
                        "& .MuiInputBase-input": {
                        fontSize: (theme) => theme.typography.h4.fontSize, 
                        padding: "3px",  
                        },
                    }}
                />
            </FormControl>
            
            <FormControl margin='normal' className={classes.description}>
                <InputLabel htmlFor="description" 
                    sx={{ fontSize: (theme) => theme.typography.subtitle1.fontSize,
                                                padding: "10px", 
                    }}
                >
                    Description
                </InputLabel>
                
                <Input id="description" name="description" 
                    value={post.description}
                    onChange={onChangeField} 
                    sx = {{
                        "& .MuiInputBase-input": {
                        fontSize: (theme) => theme.typography.subtitle1.fontSize, 
                        padding: "10px",  
                        },
                    }}
                />
            </FormControl>
            
            <Divider />
        </div>
    );
};

export default withStyles(styles)(BasePostInfo);
