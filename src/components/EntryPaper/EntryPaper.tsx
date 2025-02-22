import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useStyles } from './styles';
import { Paper } from '@mui/material';

interface EntryPageProps extends PropsWithChildren {
    className?: string;
}

const EntryPage: FunctionComponent<EntryPageProps> = (props) => {
    const classes = useStyles();
    const { children, className } = props;
    return <Paper elevation={3} className={clsx(classes.root, className)}> {children}</Paper>;
};

export default EntryPage;
