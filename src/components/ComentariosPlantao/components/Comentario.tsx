import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { comentario } from '..';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import Link from '@material-ui/core/Link';
// import Collapse from '@material-ui/core/Collapse';
import BotaoCurtida from './BotaoCurtida';
import IconeCurtida from '../../../assets/images/icones/curtida.svg';
import api from '../../../services/api';
import theme from '../../../assets/styles/theme';

interface ComentarioProps {
    comentario: comentario;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: theme.spacing(3),
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'stretch',
            background: 'transparent',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius
        },
        sumario: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        usuario: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch'
        },
        avatar: {
            height: '3rem',
            width: '3rem',
            background: 'var(--cor-fundo-principal)',
            color: 'var(--cor-texto-claro)',
            fontSize: '1.6rem',
            marginRight: '1.2rem'
        },
        nomeUsuario: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
        },
        texto: {
            marginTop: theme.spacing(2),
            marginLeft: '4.2rem'
        },
        interacaoComentario: {
            marginTop: '1.2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        botaoCurtida: {
            marginRight: '1.2rem',
            background: 'transparent'
        },
        botaoCurtidaAtivo: {
            background: 'red'
        },
        numeroCurtidas: {
            marginRight: '0.4rem',
            color: '#FF817C'
        },
        iconeCurtidas: {
            width: '1.2rem',
            height: 'auto'
        },
        respostas: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            marginLeft: '4.2rem',
            marginTop: '1.2rem',
            borderTop: '1px solid var(--cor-borda-campos)',
            padding: '1.2rem 0'

        },
        textoResposta: {
            marginLeft: '4.2rem',
            marginBottom: '1.2rem'
        }
    })
);

function Comentario({ comentario }: ComentarioProps) {
    const classes = useStyles();
    const [curtiu, setCurtiu] = useState(comentario.euCurti);
    const [numeroCurtidas, setNumeroCurtidas] = useState(comentario.curtidas);
    // const [abrir, setAbrir] = useState(false);

    async function handleCurtida() {
        try {
            await api.post('/comentarios/curtida', {
                id_comentario: comentario.idComentario
            }).then((response) => {
                switch (response.status) {
                case 200:
                    setCurtiu(false);
                    setNumeroCurtidas(comentario.curtidas - (comentario.euCurti ? 1 : 0));
                    break;
                case 201:
                    setCurtiu(true);
                    setNumeroCurtidas(comentario.curtidas + 1 - (comentario.euCurti ? 1 : 0));
                    break;
                default:
                    break;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    function formatarData(dateString: string) {
        const now = new Date();
        const date = new Date(dateString);

        const meses: string[] = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ];

        if (date.getFullYear() === now.getFullYear()) {
            if (date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate()) {
                return `${date.getHours()}:${date.getMinutes()}`;
            }
            return `${date.getDate()} de ${meses[date.getMonth() - 1]}`;
        }
        return `${date.getDate()} de ${meses[date.getMonth() - 1]} de ${date.getFullYear()}`;
    }

    return (
        <div className={classes.root}>
            <div className={classes.sumario}>
                <div className={classes.usuario}>
                    <Avatar className={classes.avatar}>
                        {comentario?.nomeUsuario.charAt(0)}
                    </Avatar>
                    <div className={classes.nomeUsuario}>
                        <Typography
                            variant="body1" color="textPrimary"
                        >
                            {comentario.nomeUsuario}
                        </Typography>
                        <Typography
                            variant="caption" color="textSecondary"
                        >
                            {formatarData(comentario.data)}
                        </Typography>
                    </div>
                </div>
                <Typography
                    variant="body1" gutterBottom
                >
                    {comentario.respostas.length > 0
                        ? comentario.respostas.length === 1
                            ? '1 resposta'
                            : comentario.respostas.length + ' respostas'
                        : ''
                    }
                </Typography>
            </div>
            <div className={classes.texto}>
                <Typography
                    variant="body1" gutterBottom
                >
                    {comentario.texto}
                </Typography>
                <div className={classes.interacaoComentario}>
                    <BotaoCurtida
                        curtida={curtiu}
                        handleCurtida={handleCurtida}
                    />
                    {numeroCurtidas > 0 && (
                        <>
                            <Typography
                                variant="body1"
                                className={classes.numeroCurtidas}
                            >
                                {numeroCurtidas}
                            </Typography>
                            <img src={IconeCurtida} className={classes.iconeCurtidas}/>
                        </>
                    )}
                    {/* <Link
                        component="button"
                        variant="subtitle1"
                        onClick={() => setAbrir((prev) => !prev)}
                    >
                        <Typography
                            variant="subtitle1" gutterBottom
                        >
                            Responder
                        </Typography>
                    </Link>
                    {comentario.respostas.length > 0 && (
                        <Typography
                            variant="subtitle1" gutterBottom
                        >
                            {comentario.respostas.length === 1
                                ? '1 resposta'
                                : comentario.respostas.length + ' respostas'
                            }
                        </Typography>
                    )} */}
                </div>
            </div>
            {/* {comentario.respostas.length > 0 && (
                <Collapse in={!abrir}>
                    <div className={classes.respostas}>
                        {comentario.respostas.map(resposta => {
                            return (
                                <div key={resposta.idResposta}>
                                    <div className={classes.usuario}>
                                        <Avatar className={classes.avatar}>
                                            {resposta.nomeUsuario.charAt(0)}
                                        </Avatar>
                                        <div className={classes.nomeUsuario}>
                                            <Typography
                                                variant="h6"
                                            >
                                                {resposta.nomeUsuario}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                            >
                                                {formatarData(resposta.data)}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography
                                        variant="body1" gutterBottom
                                        className={classes.textoResposta}
                                    >
                                        {resposta.texto}
                                    </Typography>
                                </div>
                            );
                        })}
                    </div>
                </Collapse>
            )} */}
        </div>
    );
}

export default Comentario;
