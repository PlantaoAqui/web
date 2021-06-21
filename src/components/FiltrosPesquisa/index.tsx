import React, { useEffect, useState } from 'react';
import './styles.css';

import { Typography } from '@material-ui/core';
import { Plantao } from '../../pages/plantoes';
import Filtro from './components/Filtro';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FiltroBase from './components/FiltroBase';
import api from '../../services/api';
import useSearch from '../../hooks/use-search';
import Button from '../Button';

export interface PlantoesPesquisadosProps {
    plantoes: Array<Plantao>;
    setPlantoes: (plantoes: Array<Plantao>) => void;
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

const useStyles = makeStyles(() =>
    createStyles({
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

function FiltrosPesquisa ({ plantoes }: PlantoesPesquisadosProps) {
    const classes = useStyles();
    const search = useSearch();
    const [tipoPlantao, setTipoPlantao] = useState<TipoPlantao[] | null>(null);
    const [filtrosExpanded, setFiltrosExpanded] = useState<number | false>(false);

    const handleClickAccordionFiltros = (tipo: number) => {
        setFiltrosExpanded(filtrosExpanded === tipo ? false : tipo);
        search.setDados.setTipo(filtrosExpanded === tipo ? 0 : tipo);
        search.setDados.setSubcategoria([]);
    };

    async function listarTiposPlantao () {
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
        <div className="filtrospesquisa">
            <Button
                type="button"
                background="#A1E09E"
                texto="Nova Avaliação"
            />
            <div className={classes.resultados}>
                <Typography variant="h5"
                    color="textSecondary"
                >
                    Plantoes encontrados
                </Typography>
                <Typography variant="h5"
                    color="textPrimary"
                >
                    {plantoes === undefined || !Array.isArray(plantoes)
                        ? 0
                        : plantoes.length} plantões
                </Typography>
            </div>
            <Typography variant="h5" gutterBottom
                className={classes.indices}
            >
                Filtros
            </Typography>
            <FiltroBase/>
            <Typography variant="h5" gutterBottom
                className={classes.indices}
            >
                Filtrar por Categorias de Plantão
            </Typography>
            {tipoPlantao && tipoPlantao.length > 0 && tipoPlantao.map(tipo => {
                return (
                    <Filtro
                        key={tipo.id}
                        tipo={tipo}
                        expanded={filtrosExpanded === tipo.id}
                        resultados={10}
                        handleChange={() => handleClickAccordionFiltros(tipo.id)}
                    />
                );
            })}
        </div>
    );
}

export default FiltrosPesquisa;
