import { WithStyles, withStyles } from '@mui/styles';
import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren } from 'react';
import { styles } from './styles';

interface CenteredPageProps
    extends WithStyles<typeof styles>,
        PropsWithChildren {
    className?: string;
}

const CenteredPage: FunctionComponent<CenteredPageProps> = (props) => {
    const { classes, children, className } = props;
    return <div className={clsx(classes.root, className)}>{children}</div>;
};

export default withStyles(styles)(CenteredPage);
