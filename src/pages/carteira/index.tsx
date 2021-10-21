import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '../../components/Button';
import CardTitulo from '../../components/CardTitulo';
import ItemLista from '../../components/ItemLista';
import { Checkbox, Divider, FormControlLabel, Grid, List, ListItemText, ListSubheader } from '@material-ui/core';
import StackedBarChart from '../../components/StackedBarChart';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import api from '../../services/api';
import { Skeleton } from '@material-ui/lab';
import ModalAvaliacaoPlantao from '../../components/ModalAvaliacaoPlantao';

type DadosPlantao = {
    id: number;
    nome: string;
    icone: string;
    valor: number;
    data: string;
    recebido: boolean;
};

type PlantoesAgrupados = {
    mes: string;
    plantoes: DadosPlantao[];
};

type ResponsePlantoes = {
    plantoes: DadosPlantao[];
    count: number;
};

type DadosCarteira = {
    nome: string;
    sobrenome: string;
    valorRecebido: number;
    valorAReceber: number;
    receitaTotal: number;
    valorMedio: number;
    plantoes: number;
    horasTrabalhadas: number;
    instituicoes: number;
    classes: number;
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
        conteudo: {
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row'
        },
        graficos: {
            width: '70%',
            marginRight: theme.spacing(3),
            overflowY: 'scroll',
            overflowX: 'hidden',
            paddingBottom: theme.spacing(4),
            '&::-webkit-scrollbar': {
                width: theme.spacing(0)
            }
        },
        financeiro: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            gridGap: theme.spacing(3)
        },
        filtros: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginRight: theme.spacing(3),
            padding: theme.spacing(2),
            width: '70%'
        },
        dadosFinanceiro: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            gridGap: theme.spacing(3)
        },
        tituloCard: {
            gridColumn: '1/3'
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
            background: theme.palette.background.paper,
            marginBottom: theme.spacing(2),
            padding: theme.spacing(2)
        },
        divisorHistorico: {
            position: 'relative',
            top: theme.spacing(-5)
        },
        inputCheckbox: {
            padding: theme.spacing(1),
            left: 0
        }
    })
);

function Carteira () {
    const classes = useStyles();
    const [modalAvaliacaoHospitalAberto, setModalAvaliacaoHospitalAberto] = useState(false);

    const getDadosPlantoes = useAsync(
        async () => await api.get('/usuarios', {
            params: { filtro: 'plantoes' }
        }),
        [],
        {
            setLoading: state => ({ ...state, loading: false })
        }
    );

    const getDadosCarteira = useAsync(
        async () => await api.get('/usuarios', {
            params: { filtro: 'carteira' }
        }),
        [],
        {
            setLoading: state => ({ ...state, loading: false })
        }
    );

    const updateRecebidoPlantao = useAsyncCallback(async (id: number, value: boolean) => {
        try {
            await api.patch(`/plantoes/${id}/recebido`, { value });
            getDadosPlantoes.execute();
        } catch (error) {
            console.log(error);
        }
    });

    const dadosPlantoes : ResponsePlantoes = getDadosPlantoes.result?.data;
    const dadosCarteira : DadosCarteira = getDadosCarteira.result?.data;

    function randomWidth (min: number) {
        const width = Math.random() * (1 - min) + min;

        return 'scale(' + width + ', 0.6)';
    }

    function formatarValor (valor: number) {
        return 'R$ ' + valor.toFixed(2).toString();
    }

    function juntarMeses (plantoes: DadosPlantao[]) {
        const grupos = plantoes.reduce(
            (resultado: Record<string, PlantoesAgrupados>, plantao) => {
                const mes = plantao.data.split(('-'))[1];

                (resultado[mes])
                    ? (
                        resultado[mes].plantoes.push(plantao)
                    )
                    : (
                        resultado[mes] = {
                            mes,
                            plantoes: [plantao]
                        }
                    );

                return resultado;
            }, {});

        return Object.keys(grupos).map(function (k) {
            return grupos[k];
        });
    }

    function getMonth (mes: string) {
        const date = new Date();
        date.setDate(1);
        date.setMonth(parseInt(mes) - 1);

        const mesEscrito = date.toLocaleString('pt-BR', { month: 'long' });

        return mesEscrito.charAt(0).toUpperCase() + mesEscrito.slice(1);
    }

    return (
        <div className={classes.root}>
            <NavBar tipoLinks="default"/>
            <div className={classes.cabecalho}>
                <div className={classes.filtros}>
                    <Typography
                        variant="h2" color="textPrimary"
                    >
                        {dadosCarteira && !getDadosCarteira.loading
                            ? (
                                dadosCarteira.nome + ' ' + dadosCarteira.sobrenome
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
                    <Typography
                        variant="body1" color="textSecondary"
                    >
                        Filtrar por:  Mês | Ano | Semana
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
                <div className={classes.graficos}>
                    {dadosCarteira && !getDadosCarteira.loading
                        ? (
                            <Grid container spacing={3}>
                                <Grid container item spacing={3}>
                                    <Grid container xs={6} item>
                                        <CardTitulo
                                            titulo="Financeiro"
                                        >
                                            <Grid container>
                                                <Grid container item xs={6}>
                                                    <ListItemText
                                                        primary="Valor recebido:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={formatarValor(dadosCarteira.valorRecebido)}
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary="Receita total:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={formatarValor(dadosCarteira.receitaTotal)}
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid container item xs={6}>
                                                    <ListItemText
                                                        primary="Valor a receber:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={formatarValor(dadosCarteira.valorAReceber)}
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary="Média por 12h:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={formatarValor(dadosCarteira.valorMedio)}
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardTitulo>
                                    </Grid>
                                    <Grid container xs={6} item>
                                        <CardTitulo
                                            titulo="Plantões"
                                        >
                                            <Grid container>
                                                <Grid container item xs={6}>
                                                    <ListItemText
                                                        primary="N° plantões:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={dadosCarteira.plantoes === 0
                                                            ? 'Nenhum'
                                                            : dadosCarteira.plantoes === 1
                                                                ? '1 plantão'
                                                                : dadosCarteira.plantoes + ' plantões'
                                                        }
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary="N° instituições:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={dadosCarteira.instituicoes === 0
                                                            ? 'Nenhuma'
                                                            : dadosCarteira.instituicoes === 1
                                                                ? '1 instituição'
                                                                : dadosCarteira.instituicoes + ' instituições'
                                                        }
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid container item xs={6}>
                                                    <ListItemText
                                                        primary="Horas trabalhadas:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={dadosCarteira.horasTrabalhadas === 0
                                                            ? 'Nenhuma'
                                                            : dadosCarteira.horasTrabalhadas === 1
                                                                ? '1 hora'
                                                                : dadosCarteira.horasTrabalhadas + ' horas'
                                                        }
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary="Classes de plantão:"
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'textSecondary'
                                                        }}
                                                        secondary={dadosCarteira.classes === 0
                                                            ? 'Nenhuma'
                                                            : dadosCarteira.classes === 1
                                                                ? '1 classe'
                                                                : dadosCarteira.classes + ' classes'
                                                        }
                                                        secondaryTypographyProps={{
                                                            variant: 'h6',
                                                            color: 'textPrimary'
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardTitulo>
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <StackedBarChart/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <StackedBarChart/>
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <StackedBarChart/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <StackedBarChart/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                        : (
                            <Grid container spacing={3}>
                                <Grid container item spacing={3}>
                                    <Grid container xs={6} item>
                                        <CardTitulo
                                            titulo="Financeiro"
                                            loading
                                        >
                                            <Grid container spacing={3}>
                                                {[...Array(4)].map((_, i) => (
                                                    <Grid container item key={i} xs={6}>
                                                        <ListItemText
                                                            primary={
                                                                <Skeleton
                                                                    style={{
                                                                        transform: randomWidth(0.6)
                                                                    }}
                                                                />
                                                            }
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={
                                                                <Skeleton
                                                                    style={{
                                                                        transform: randomWidth(0.3)
                                                                    }}
                                                                />
                                                            }
                                                            secondaryTypographyProps={{
                                                                variant: 'h6',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </CardTitulo>
                                    </Grid>
                                    <Grid container xs={6} item>
                                        <CardTitulo
                                            titulo="Plantões"
                                            loading
                                        >
                                            <Grid container spacing={3}>
                                                {[...Array(4)].map((_, i) => (
                                                    <Grid container item key={i} xs={6}>
                                                        <ListItemText
                                                            primary={
                                                                <Skeleton
                                                                    style={{
                                                                        transform: randomWidth(0.6)
                                                                    }}
                                                                />
                                                            }
                                                            primaryTypographyProps={{
                                                                variant: 'body1',
                                                                color: 'textSecondary'
                                                            }}
                                                            secondary={
                                                                <Skeleton
                                                                    style={{
                                                                        transform: randomWidth(0.3)
                                                                    }}
                                                                />
                                                            }
                                                            secondaryTypographyProps={{
                                                                variant: 'h6',
                                                                color: 'textPrimary'
                                                            }}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </CardTitulo>
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Skeleton>
                                        <Grid item xs={6}/>
                                    </Skeleton>
                                    <Skeleton>
                                        <Grid item xs={6}/>
                                    </Skeleton>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <StackedBarChart/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <StackedBarChart/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </div>
                <div className={classes.historico}>
                    {dadosPlantoes && !getDadosPlantoes.loading
                        ? (
                            <CardTitulo
                                titulo="Histórico de Plantões"
                            >
                                <List subheader={<li />}>
                                    {juntarMeses(dadosPlantoes.plantoes).map((grupo, i) => (
                                        <li key={i}>
                                            <ul>
                                                <ListSubheader className={classes.cabecalhoHistorico}>
                                                    <Typography
                                                        variant="subtitle1" color="textPrimary"
                                                    >
                                                        {getMonth(grupo.mes)}
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1" color="textSecondary"
                                                    >
                                                        {grupo.plantoes.length === 1
                                                            ? '1 plantão'
                                                            : grupo.plantoes.length + ' plantões'}
                                                    </Typography>
                                                </ListSubheader>
                                                {grupo.plantoes.map((plantao, j) => (
                                                    <>
                                                        <ItemLista
                                                            key={j}
                                                            horizontal
                                                            icone={plantao.icone}
                                                            q1={plantao.nome}
                                                            q2={formatarValor(plantao.valor || 0)}
                                                            q3={new Date(plantao.data).toLocaleDateString()}
                                                            q4={
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox defaultChecked
                                                                            classes={{
                                                                                root: classes.inputCheckbox
                                                                            }}
                                                                            color="primary"
                                                                            checked={plantao.recebido}
                                                                            onChange={() => updateRecebidoPlantao.execute(plantao.id, !plantao.recebido)}
                                                                        />
                                                                    }
                                                                    label="Já recebeu?"
                                                                    labelPlacement="start"
                                                                />
                                                            }
                                                            isLast={j === grupo.plantoes.length}
                                                        />
                                                        <Divider
                                                            variant="inset"
                                                            className={classes.divisorHistorico}
                                                        />
                                                    </>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </List>
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

export default Carteira;
