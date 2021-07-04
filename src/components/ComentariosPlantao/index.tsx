import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Comentario from './components/Comentario';

import measureItems from '../../components/Stonecutter/higher-order-components/measureItems';
import SpringGrid from '../../components/Stonecutter/SpringGrid';
import { layout } from 'react-stonecutter';
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

const Grid = measureItems(SpringGrid);

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            background: 'var(--cor-fundo-card)',
            borderRadius: '0.8rem',
            padding: '1rem'
        },
        sumario: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1.2rem'
        },
        gridComentarios: {
            marginBottom: '1.2rem'
        },
        comentarios: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        comentario: {
            width: 'calc(50% - 0.6rem)',
            listStyle: 'none'
        },
        botaoMais: {
            background: 'transparent',
            border: 'none',
            outline: 'none',
            font: '400 1.8rem SFProText',
            color: 'var(--cor-texto-claro)',
            marginBottom: '1.2rem'
        }
    })
);

function ComentariosPlantao ({ id_hospital_avaliado, comentarios, reload }: ComentariosPlantaoProps) {
    const classes = useStyles();

    async function postarComentario (comentario: string) {
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
            <Grid
                className={classes.gridComentarios}
                component="ul"
                columns={2}
                columnWidth={375}
                gutterWidth={13}
                gutterHeight={13}
                layout={layout.pinterest}
                springConfig={{ stiffness: 170, damping: 26 }}
            >
                {comentarios.map(comentario => {
                    return (
                        <li key={comentario.idComentario}
                            className={classes.comentario}
                        >
                            <Comentario comentario={comentario}/>
                        </li>
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
