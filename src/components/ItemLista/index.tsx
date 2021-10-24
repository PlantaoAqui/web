import React, { ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        },
        horizontal: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: theme.spacing(3)
        },
        nome: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical'
        }
    })
);

interface ItemListaProps {
    icone: string;
    horizontal?: boolean;
    loading?: boolean;
    q1?: string;
    q2?: string;
    q3?: string;
    q4?: ReactNode;
    isLast?: boolean;
}

function ItemLista({
    icone, horizontal = false, loading = false,
    q1, q2, q3, q4, isLast = false
}: ItemListaProps) {
    const classes = useStyles();

    function component(c: ReactNode) {
        if (loading) {
            const width = Math.random() * (0.8 - 0.6) + 0.6;
            return (
                <Skeleton
                    style={{
                        transform: 'scale(' + width + ', 0.6)'
                    }}
                />
            );
        } else {
            return c;
        }
    }

    return (
        <Grid container spacing={5} className={classes.root}
            style={!isLast ? { marginBottom: '1.2rem' } : {}}
        >
            <Grid item>
                {loading
                    ? (
                        <Skeleton
                            variant="rect"
                            width={48}
                            height={48}
                            style={{ borderRadius: '1.2rem' }}
                        />
                    )
                    : (
                        <img src={icone} alt={q1}
                            style={{ width: '4.8rem', height: 'auto' }}
                        />
                    )}
            </Grid>
            {horizontal
                ? (
                    <Grid item xs={12} sm container direction="column" spacing={1}>
                        <Grid item xs>
                            <div className={classes.horizontal}>
                                <Typography className={classes.nome}
                                    style={q2 ? {} : { flex: 1 }}
                                    variant="body1" color="textPrimary"
                                >
                                    {component(q1)}
                                </Typography>
                                {q2 && (
                                    <Typography style={{ whiteSpace: 'nowrap' }}
                                        variant="body1" color="textSecondary"
                                    >
                                        {component(q2)}
                                    </Typography>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs container spacing={1}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1" color="textSecondary"
                                >
                                    {component(q3)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="center"
                                    variant="body1" color="textSecondary"
                                >
                                    {component(q4)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )
                : (
                    <Grid item xs={12} sm container style={!isLast ? { borderBottom: '1px solid #B7B8BA', marginBottom: '1rem' } : {}}>
                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item>
                                <Typography className={classes.nome}
                                    variant="body1" color="textPrimary"
                                >
                                    {component(q1)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1" color="textSecondary"
                                >
                                    {component(q3)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item>
                                <Typography align="right"
                                    variant="body1" color="textSecondary"
                                >
                                    {component(q2)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {component(q4)}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
        </Grid>
    );
}

export default ItemLista;
