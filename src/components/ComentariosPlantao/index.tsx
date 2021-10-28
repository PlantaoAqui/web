import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Comentario from './components/Comentario';

import TextForm from '../TextForm';
import api from '../../services/api';

interface ComentariosPlantaoProps {
    id_hospital_avaliado: number;
    comentarios: Array<comentario>;
    reload: () => void;
}

export type comentario = {
    idComentario: number;
    nomeUsuario: string;
    data: string;
    texto: string;
    curtidas: number;
    euCurti: boolean;
    respostas: Array<resposta>;
};

type resposta = {
    idResposta: number;
    nomeUsuario: string;
    data: string;
    texto: string;
    curtidas: number;
    euCurti: boolean;
};

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            background: 'var(--cor-fundo-card)',
            borderRadius: theme.shape.borderRadius,
            padding: '1rem'
        },
        sumario: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(3)
        },
        gridComentarios: {
            marginBottom: theme.spacing(3)
        },
        comentarios: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        botaoMais: {
            background: 'transparent',
            border: 'none',
            outline: 'none',
            font: '400 1.8rem SFProText',
            color: 'var(--cor-texto-claro)',
            marginBottom: theme.spacing(3)
        }
    })
);

function ComentariosPlantao({ id_hospital_avaliado, comentarios, reload }: ComentariosPlantaoProps) {
    const classes = useStyles();

    async function postarComentario(comentario: string) {
        try {
            await api.post('/comentarios', {
                id_hospital_avaliado,
                comentario
            }).then(() => reload());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.sumario}>
                <Typography
                    variant="h6" gutterBottom
                >
                    Comentários
                </Typography>
                <Typography
                    variant="body1" gutterBottom
                >
                    {comentarios.length === 0
                        ? 'Nenhum comentário'
                        : comentarios.length === 1
                            ? '1 comentário'
                            : comentarios.length + ' comentários'}
                </Typography>
            </div>
            <Grid container spacing={3} className={classes.gridComentarios}>
                {comentarios.map((comentario, i) => {
                    return (
                        <Grid item xs={12} md={6} key={i}>
                            <Comentario comentario={comentario}/>
                        </Grid>
                    );
                })}
            </Grid>
            <TextForm
                placeholder="Escreva um comentario..."
                onSubmit={(comentario) => postarComentario(comentario)}
            />
        </div>
    );
}

export default ComentariosPlantao;
