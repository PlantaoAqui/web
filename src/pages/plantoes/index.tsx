import React from 'react';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';

import logoCinza from '../../assets/images/logos/plantaoFacilCinza.svg';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import api from '../../services/api';
import useSearch from '../../hooks/use-search';
import { useDebounce } from 'use-debounce/lib';
import { useAsync } from 'react-async-hook';

export interface Plantao {
    idPlantao: number;
    nome: string;
    tipo: number;
    subcategoria: number;
    icone: string;
    nota: number;
    media_salarial: number;
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '80vw',
            height: '100vh',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            [theme.breakpoints.down('sm')]: {
                width: '90vw',
                overflowY: 'unset'
            }
        },
        container: {
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                overflow: 'unset'
            }
        },
        filtros: {
            width: '25%',
            minWidth: '22rem',
            marginTop: theme.spacing(20),
            marginRight: theme.spacing(3),
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginBottom: theme.spacing(4)
            }
        },
        resultados: {
            width: '75%',
            paddingTop: theme.spacing(20),
            overflowY: 'scroll',
            overflowX: 'hidden',
            paddingBottom: theme.spacing(4),
            '&::-webkit-scrollbar': {
                width: theme.spacing(0)
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                paddingTop: 0
            }
        },
        semResultados: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'max-content',
            margin: '35vh auto',
            textAlign: 'center',
            '& img': {
                marginBottom: theme.spacing(3)
            }
        }
    })
);

function Plantoes() {
    const search = useSearch();
    const classes = useStyles();
    const [debouncedSearch] = useDebounce(search.dados, 500);

    const obterPlantoes = async () => {
        if (search.dados.uf !== 0 && search.dados.municipio !== 0) {
            return await api.get('plantoes', {
                params: {
                    remuneracaoMin: debouncedSearch.intervaloRemuneracao[0],
                    remuneracaoMax: debouncedSearch.intervaloRemuneracao[1],
                    like: debouncedSearch.like,
                    ordenarPor: search.dados.ordenarPor,
                    uf: search.dados.uf,
                    municipio: search.dados.municipio,
                    nota: search.dados.nota,
                    tipo: search.dados.tipo,
                    subcategoria: search.dados.subcategoria
                }
            });
        }
    };

    const pesquisarPlantoes = useAsync(
        obterPlantoes,
        [
            debouncedSearch.intervaloRemuneracao,
            debouncedSearch.like,
            search.dados.ordenarPor,
            search.dados.uf,
            search.dados.municipio,
            search.dados.nota,
            search.dados.tipo,
            search.dados.subcategoria
        ],
        {
            setLoading: state => ({ ...state, loading: true })
        }
    );

    return (
        <div className={classes.root}>
            <NavBar tipoLinks="default"/>
            <div className={classes.container}>
                <div className={classes.filtros}>
                    <FiltrosPesquisa
                        resultados={pesquisarPlantoes.result?.data.resultados}
                        count={pesquisarPlantoes.result?.data.count}
                    />
                </div>
                <div className={classes.resultados}>
                    {pesquisarPlantoes.result?.data &&
                        pesquisarPlantoes.result.data.resultados > 0
                        ? (
                            <Grid container spacing={3}>
                                {(pesquisarPlantoes.result.data.plantoes as Plantao[]).map(cardPlantao => {
                                    return (
                                        <Grid item xs={12} md={6} lg={4} xl={3} key={cardPlantao.idPlantao}>
                                            <CardHospital
                                                plantao={cardPlantao}
                                            />
                                        </Grid>

                                    );
                                })}
                            </Grid>
                        )
                        : (
                            <div className={classes.semResultados}>
                                <img src={logoCinza} alt="Plantão Fácil" />
                                <Typography
                                    variant="subtitle1" color="textSecondary"
                                    style={{ lineHeight: 1.25 }}
                                >
                                    Nenhum plantão foi encontrado <br /> para essa pesquisa
                                </Typography>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Plantoes;
