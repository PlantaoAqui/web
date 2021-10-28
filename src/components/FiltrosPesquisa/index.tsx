import React, { useEffect, useState } from 'react';

import { Typography, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Filtro, { resultados } from './components/Filtro';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FiltroBase from './components/FiltroBase';
import api from '../../services/api';
import useSearch from '../../hooks/use-search';
import Button from '../Button';
import ModalAvaliacaoPlantao from '../ModalAvaliacaoPlantao';

import ExpandIcon from '@material-ui/icons/ExpandMore';

export interface PlantoesPesquisadosProps {
    resultados?: number;
    count?: resultados[];
}

export type TipoPlantao = {
    id: number;
    nome: string;
    icone: string;
    subcategorias: Subcategoria[]
};

type Subcategoria = {
    id: number;
    id_tipo: number;
    nome: string;
};

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            overflow: 'hidden',
            height: '100%'
        },
        resultados: {
            width: '100%',
            padding: '0.7rem 1.3rem',
            background: 'var(--cor-fundo-card)',
            borderRadius: '8px',
            margin: '1.3rem 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'flex-start'
        },
        filtros: {
            width: '100%',
            // marginRight: theme.spacing(3),
            overflowX: 'hidden',
            overflowY: 'scroll',
            paddingRight: theme.spacing(1),
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
            [theme.breakpoints.down('sm')]: {
                padding: 0,
                overflow: 'unset'
            }
        },
        accordionMobile: {
            marginBottom: theme.spacing(4),
            '&:before': {
                display: 'none'
            },
            '&:last-child': {
                borderRadius: theme.shape.borderRadius
            }
        },
        accordionSummaryMobile: {
            margin: theme.spacing(0, 2)
        },
        accordionSummarContentMobile: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        accordionSummaryIcon: {
            fontSize: '2.5rem'
        },
        accordionDetailsMobile: {
            background: theme.palette.background.default,
            padding: 0
        },
        textoClaro: {
            color: 'var(--cor-texto-claro)',
            font: '400 1.4rem SFProText'
        },
        textoEscuro: {
            color: 'var(--cor-texto-escuro)',
            font: '500 1.4rem SFProText'
        },
        indices: {
            width: '100%',
            paddingLeft: '1.3rem',
            marginBottom: '1.2rem'
        }
    })
);

function FiltrosPesquisa({ resultados, count }: PlantoesPesquisadosProps) {
    const classes = useStyles();
    const search = useSearch();
    const [tipoPlantao, setTipoPlantao] = useState<TipoPlantao[] | null>(null);
    const [filtrosExpanded, setFiltrosExpanded] = useState<number | false>(false);
    const [modalAvaliacaoHospitalAberto, setModalAvaliacaoHospitalAberto] = useState(false);
    const [filtrosMobileAberto, setFiltrosMobileAberto] = useState(false);

    const handleClickAccordionFiltros = (tipo: number) => {
        setFiltrosExpanded(filtrosExpanded === tipo ? false : tipo);
        search.setDados.setTipo(filtrosExpanded === tipo ? 0 : tipo);
        search.setDados.setSubcategoria([]);
    };

    async function listarTiposPlantao() {
        try {
            const response = await api.get('tipos', {
                params: {
                    tipo: 'plantao'
                }
            });

            setTipoPlantao(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTiposPlantao();
    }, []);

    return (
        <div className={classes.root}>
            <Button
                type="button"
                background="#A1E09E"
                texto="Nova Avaliação"
                textTransform="none"
                onClick={() => setModalAvaliacaoHospitalAberto(true)}
            />
            <div className={classes.resultados}>
                <Typography variant="body1"
                    color="textSecondary"
                >
                    Plantoes encontrados
                </Typography>
                <Typography variant="body1"
                    color="textPrimary"
                >
                    {(resultados || 0) === 0
                        ? 'Nenhum plantão'
                        : resultados === 1
                            ? '1 plantão'
                            : resultados + ' plantões'}
                </Typography>
            </div>
            <Hidden smDown>
                <Typography variant="subtitle1" gutterBottom
                    className={classes.indices}
                >
                    Filtros
                </Typography>
                <div className={classes.filtros}>
                    <FiltroBase/>
                    <Typography variant="subtitle1" gutterBottom
                        className={classes.indices}
                    >
                        Categorias
                    </Typography>
                    {tipoPlantao && tipoPlantao.length > 0 && tipoPlantao.map(tipo => {
                        return (
                            <Filtro
                                key={tipo.id}
                                tipo={tipo}
                                expanded={filtrosExpanded === tipo.id}
                                resultados={count?.find(res => {
                                    return res.tipo === tipo.id;
                                })}
                                handleChange={() => handleClickAccordionFiltros(tipo.id)}
                            />
                        );
                    })}
                </div>
            </Hidden>
            <Hidden smUp>
                <Accordion elevation={0} expanded={filtrosMobileAberto}
                    className={classes.accordionMobile}
                    onChange={() => setFiltrosMobileAberto(!filtrosMobileAberto)}
                >
                    <AccordionSummary
                        className={classes.accordionSummaryMobile}
                        classes={{ content: classes.accordionSummarContentMobile }}
                    >
                        <Typography variant="h3">
                            Filtros
                        </Typography>
                        <ExpandIcon className={classes.accordionSummaryIcon}/>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetailsMobile}>
                        <div className={classes.filtros}>
                            <FiltroBase/>
                            <Typography variant="subtitle1" gutterBottom
                                className={classes.indices}
                            >
                                Categorias
                            </Typography>
                            {tipoPlantao && tipoPlantao.length > 0 && tipoPlantao.map(tipo => {
                                return (
                                    <Filtro
                                        key={tipo.id}
                                        tipo={tipo}
                                        expanded={filtrosExpanded === tipo.id}
                                        resultados={count?.find(res => {
                                            return res.tipo === tipo.id;
                                        })}
                                        handleChange={() => handleClickAccordionFiltros(tipo.id)}
                                    />
                                );
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </Hidden>
            <ModalAvaliacaoPlantao
                open={modalAvaliacaoHospitalAberto}
                onClose={() => { setModalAvaliacaoHospitalAberto(false); }}
            />
        </div>
    );
}

export default FiltrosPesquisa;
