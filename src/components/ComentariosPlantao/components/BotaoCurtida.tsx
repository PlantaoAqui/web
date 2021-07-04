import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface BotaoCurtidaProps {
    curtida: boolean;
    handleCurtida: () => void;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        botaoCurtida: {
            marginRight: theme.spacing(3),
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
        },
        texto: {
            color: theme.palette.text.primary
        },
        textoCurtida: {
            color: '#FF817C',
            fontWeight: 500
        }
    })
);

function BotaoCurtida (props: BotaoCurtidaProps) {
    const classes = useStyles();
    return (
        <button
            className={classes.botaoCurtida}
            onClick={props.handleCurtida}
        >
            <Typography
                variant="body1"
                className={props.curtida ? classes.textoCurtida : classes.texto}
            >
                Curtir
            </Typography>
        </button>
    );
}

export default BotaoCurtida;
