import { Box, Button } from '@mui/material';
import { FunctionComponent } from 'react';

interface NotEditingActionsProps {
    navigatePreviousRoute: () => void;
    startEdit: () => void;
}

const NotEditingActions: FunctionComponent<NotEditingActionsProps> = (
    props
) => {
    const { navigatePreviousRoute, startEdit } = props;

    return (
        <Box display='flex' gap={2} mt={3}>
            <Button
                variant='contained'
                color='primary'
                onClick={navigatePreviousRoute}
                sx={{ mt: 3 }}
            >
                Back
            </Button>

            <Button
                variant='contained'
                color='primary'
                onClick={startEdit}
                sx={{ mt: 3 }}
            >
                Edit Profile
            </Button>
        </Box>
    );
};

export default NotEditingActions;
