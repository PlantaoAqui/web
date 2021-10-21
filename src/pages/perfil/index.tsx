import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '../../components/Button';
import CardTitulo from '../../components/CardTitulo';
import ItemLista from '../../components/ItemLista';
import { Grid, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import api from '../../services/api';
import { useAsync } from 'react-async-hook';
import AlterarPerfil, { DadosPerfil } from './components/AlterarPerfil';
import { Skeleton } from '@material-ui/lab';
import AlterarSenha from './components/AlterarSenha';
import StarRating from '../../components/StarRating';
import ModalAvaliacaoPlantao from '../../components/ModalAvaliacaoPlantao';

type DadosAvaliacoes = {
    nome: string;
    icone: string;
    nota: number;
    data: string;
};

type ResponseAvaliacoes = {
    avaliacoes: DadosAvaliacoes[];
    count: number;
};

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '80vw',
            height: '90vh',
            margin: '10vh auto 0',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden'
        },
        cabecalho: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(4),
            '& button': {
                width: '30%'
            }
        },
        titulo: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginRight: theme.spacing(3),
            padding: theme.spacing(2),
            width: '70%'
        },
        conteudo: {
            width: '100%',
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'row'
        },
        informacoes: {
            width: '70%',
            marginRight: theme.spacing(3),
            overflowY: 'scroll',
            overflowX: 'hidden',
            paddingBottom: theme.spacing(4),
            '&::-webkit-scrollbar': {
                width: theme.spacing(0)
            }
        },
        historico: {
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            overflowX: 'hidden',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: theme.spacing(1.5)
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[500],
                borderRadius: theme.spacing(2),
                '&:hover': {
                    backgroundColor: theme.palette.grey[600]
                }
            },
            marginBottom: theme.spacing(4)
        },
        cabecalhoHistorico: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(2)
        },
        inputCheckbox: {
            padding: theme.spacing(1),
            left: 0
        },
        condicoesSenha: {
            margin: theme.spacing(8)
        },
        spacer: {
            height: theme.spacing(3)
        }
    })
);

function Perfil () {
    const classes = useStyles();
    const [alterandoDados, setAlterandoDados] = useState(false);
    const [showAlterarSenha, setShowAlterarSenha] = useState(false);
    const [modalAvaliacaoHospitalAberto, setModalAvaliacaoHospitalAberto] = useState(false);

    const getDadosPerfil = useAsync(
        async () => await api.get('/usuarios', {
            params: { filtro: 'perfil' }
        }),
        []
    );

    const getDadosAvaliacoes = useAsync(
        async () => await api.get('/usuarios', {
            params: { filtro: 'avaliacoes' }
        }),
        []
    );

    const perfil : DadosPerfil = getDadosPerfil.result?.data;
    const dadosAvaliacoes : ResponseAvaliacoes = getDadosAvaliacoes.result?.data;

    function randomWidth (min: number) {
        const width = Math.random() * (1 - min) + min;

        return 'scale(' + width + ', 0.6)';
    }

    return (
        <div className={classes.root}>
            <NavBar tipoLinks="default"/>
            <div className={classes.cabecalho}>
                <div className={classes.titulo}>
                    <Typography
                        variant="h2" color="textPrimary"
                    >
                        {perfil && !getDadosPerfil.loading
                            ? (
                                perfil.nome + ' ' + perfil.sobrenome
                            )
                            : (
                                <Skeleton
                                    width={300}
                                    style={{
                                        transform: 'scale(1, 0.80)'
                                    }}
                                />
                            )
                        }
                    </Typography>
                </div>
                <Button
                    texto="Adicionar Avaliação"
                    type="button"
                    background="#A1E09E"
                    onClick={() => setModalAvaliacaoHospitalAberto(true)}
                />
            </div>
            <div className={classes.conteudo}>
                <div className={classes.informacoes}>
                    {perfil && !getDadosPerfil.loading
                        ? (
                            alterandoDados
                                ? (
                                    <AlterarPerfil
                                        perfil={perfil}
                                        close={() => setAlterandoDados(false)}
                                        update={() => {
                                            getDadosPerfil.execute()
                                                .then(() => setAlterandoDados(false));
                                        }}
                                    />
                                )
                                : (
                                    <Grid container direction="column" spacing={3}>
                                        <Grid item>
                                            <CardTitulo
                                                titulo="Informações pessoais"
                                                transparent
                                            >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Data de nascimento"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={new Date(perfil.dataDeNascimento).toLocaleDateString()}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Email"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={perfil.email}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Instituição de ensino"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={perfil.instituicaoDeEnsino}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Telefone"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary="(11) 98374-8384"
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Grau de formação"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={perfil.grauDeFormacao}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="CRM"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={perfil.crm}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Estado"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={perfil.uf.nomeUF}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <ListItemText
                                                            primary="Cidade"
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={perfil.municipio.nomeMunicipio}
                                                            secondaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardTitulo>
                                        </Grid>
                                        <Grid container spacing={3} item>
                                            <Grid item xs={6}>
                                                <Button
                                                    texto="Editar perfil"
                                                    type="button"
                                                    onClick={() => setAlterandoDados(true)}
                                                    background="#3F3F3F"
                                                    dark
                                                    textTransform="none"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    texto="Alterar senha"
                                                    type="button"
                                                    onClick={() => setShowAlterarSenha(!showAlterarSenha)}
                                                    variant="outlined"
                                                    textTransform="none"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Collapse in={showAlterarSenha}>
                                            <AlterarSenha
                                                close={() => setShowAlterarSenha(false)}
                                            />
                                        </Collapse>
                                    </Grid>
                                )
                        )
                        : (
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <CardTitulo
                                        titulo="Informações pessoais"
                                        transparent
                                        loading
                                    >
                                        <Grid container spacing={3}>
                                            {[...Array(8)].map((_, i) => (
                                                <Grid item xs={3} key={i}>
                                                    <ListItemText
                                                        primary={
                                                            <Skeleton
                                                                style={{
                                                                    transform: randomWidth(0.6)
                                                                }}
                                                            />}
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={
                                                            <Skeleton
                                                                style={{
                                                                    transform: randomWidth(0.3)
                                                                }}
                                                            />}
                                                        secondaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardTitulo>
                                </Grid>
                                <Grid container spacing={3} item>
                                    <Grid item xs={6}>
                                        <Skeleton
                                            style={{
                                                background: '#3F3F3F',
                                                width: '100%',
                                                height: '4rem',
                                                transform: 'unset'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Skeleton
                                            style={{
                                                width: '100%',
                                                height: '4rem',
                                                transform: 'unset'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </div>
                <div className={classes.historico}>
                    {dadosAvaliacoes && !getDadosAvaliacoes.loading
                        ? (
                            <CardTitulo
                                titulo="Minhas avaliações"
                            >
                                <div className={classes.cabecalhoHistorico}>
                                    <Typography
                                        variant="body1" color="textSecondary"
                                    >
                                        {dadosAvaliacoes.count === 0
                                            ? 'Nenhuma instituição'
                                            : dadosAvaliacoes.count === 1
                                                ? '1 instituição'
                                                : dadosAvaliacoes.count + ' instituições'}
                                    </Typography>
                                </div>
                                {dadosAvaliacoes.avaliacoes.map((avaliacao, i) => {
                                    return (
                                        <ItemLista
                                            key={i}
                                            horizontal
                                            icone={avaliacao.icone}
                                            q1={avaliacao.nome}
                                            q3={new Date(avaliacao.data).toLocaleDateString()}
                                            q4={
                                                <StarRating
                                                    value={avaliacao.nota}
                                                    readonly
                                                />
                                            }
                                            isLast={i === dadosAvaliacoes.count}
                                        />
                                    );
                                })}
                            </CardTitulo>
                        )
                        : (
                            <CardTitulo
                                titulo="Minhas avaliações"
                                loading
                            >
                                <div className={classes.cabecalhoHistorico}>
                                    <Typography
                                        variant="body1" color="textSecondary"
                                    >
                                        <Skeleton
                                            width={120}
                                        />
                                    </Typography>
                                </div>
                                {[...Array(4)].map((_, i) => {
                                    return (
                                        <ItemLista
                                            key={i}
                                            horizontal
                                            loading
                                            icone=""
                                        />
                                    );
                                })}
                            </CardTitulo>
                        )}
                </div>
            </div>
            <ModalAvaliacaoPlantao
                open={modalAvaliacaoHospitalAberto}
                onClose={() => { setModalAvaliacaoHospitalAberto(false); }}
            />
        </div>
    );
}

export default Perfil;
