import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles, createStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BolhaAzul from '../../assets/images/icones/azul.svg';
import BolhaVerde from '../../assets/images/icones/verde.svg';

interface FormOverlayProps {
    voltar: () => void;
    children: ReactNode;
}
const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            overflow: 'hidden',
            position: 'relative'
        },
        wrapper: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            background: alpha(theme.palette.grey[500], 0.4)
        },
        conteudo: {
            position: 'relative',
            background: theme.palette.background.default,
            width: '50rem',
            height: 'fit-content',
            padding: theme.spacing(3),
            borderRadius: '8px',
            margin: 'auto',
            [theme.breakpoints.down('sm')]: {
                width: '90vw'
            }
        },
        botaoVoltar: {
            position: 'absolute',
            top: theme.spacing(-10),
            textTransform: 'none',
            color: theme.palette.text.secondary,
            '&:hover': {
                background: 'transparent'
            }
        },
        copyright: {
            position: 'absolute',
            marginLeft: theme.spacing(-3),
            width: '100%',
            textAlign: 'center',
            fontWeight: 300,
            bottom: theme.spacing(-8)
        },
        background: {
            zIndex: -10
        },
        circuloVerde: {
            position: 'absolute',
            bottom: '-38vw',
            right: '-36vw',
            width: '80vw'
        },
        circuloAzul: {
            position: 'absolute',
            top: '-36vw',
            left: '-36vw',
            width: '80vw',
            [theme.breakpoints.down('md')]: {

            }
        }
    })
);

function FormOverlay({ voltar, children }: FormOverlayProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NavBar tipoLinks="none" />
            <div className={classes.wrapper}>
                <div className={classes.conteudo}>
                    <Button
                        className={classes.botaoVoltar}
                        startIcon={<ArrowBackIcon/>}
                        onClick={voltar}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        disableElevation
                    >
                        Voltar
                    </Button>
                    {children}
                    <Typography className={classes.copyright}
                        variant="subtitle1" color="textPrimary"
                    >
                        © Plantão Fácil 2021, Todos os direitos reservados.
                    </Typography>
                </div>
            </div>
            <div className={classes.background}>
                <div className={classes.circuloVerde}>
                    <img src={BolhaVerde} />
                </div>
                <div className={classes.circuloAzul}>
                    <img src={BolhaAzul} />
                </div>
            </div>
        </div>
    );
}

export default FormOverlay;
