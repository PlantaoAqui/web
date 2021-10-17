import React, { ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme =>
    createStyles({
        card: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(2),
            padding: theme.spacing(3)
        },
        transparentCard: {
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.divider}`
        },
        tituloCard: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            paddingBottom: theme.spacing(1),
            marginBottom: theme.spacing(2)
        }
    })
);

interface CardTituloProps {
    titulo: string;
    transparent?: boolean;
    children: ReactNode;
    loading?: boolean;
}

function CardTitulo ({ titulo, transparent = false, children, loading = false }: CardTituloProps) {
    const classes = useStyles();
    return (
        <div className={`${classes.card} ${transparent && classes.transparentCard}`}>
            <Typography
                className={classes.tituloCard}
                variant="h6" color="textPrimary"
            >
                {loading ? <Skeleton width={titulo}/> : titulo}
            </Typography>
            {children}
        </div>
    );
}

export default CardTitulo;
