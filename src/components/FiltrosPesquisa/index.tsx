import React, { useEffect, useState } from 'react';
import './styles.css';

import { Typography } from '@material-ui/core';
import { Hospital } from '../../pages/plantoes';
import Filtro from './components/Filtro';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SelectInputSlim from '../SelectInputSlim';
import FiltroBase from './components/FiltroBase';
import api from '../../services/api';

export interface HospitaisPesquisados {
    hospitais: Array<Hospital> | undefined;
    pesquisa: (p: number) => void;
}

enum OrdenarPor {
    Relevancia = 'Mais relevantes',
    Nota = 'Nota de avaliação',
    Remuneracao = 'Remuneração'
}

const ordenarPorValues: OrdenarPor[] = [
    OrdenarPor.Relevancia,
    OrdenarPor.Nota,
    OrdenarPor.Remuneracao
];

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
            height: '6rem',
            width: '100%',
            padding: '0.7rem 1.3rem',
            background: 'var(--cor-fundo-card)',
            borderRadius: '8px',
            marginBottom: '1.3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'stretch'
        },
        linhaSimples: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between'
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

function FiltrosPesquisa ({ hospitais, pesquisa }: HospitaisPesquisados) {
    const classes = useStyles();
    const [tipoPlantao, setTipoPlantao] = useState<TipoPlantao[] | null>(null);
    const [filtrosExpanded, setFiltrosExpanded] = useState<number | false>(false);
    const [ordenarPor, setOrdenarPor] = useState<OrdenarPor>(OrdenarPor.Relevancia);

    const handleClickAccordionFiltros = (tipo: number) => {
        setFiltrosExpanded(filtrosExpanded === tipo ? false : tipo);
        pesquisa(filtrosExpanded ? 0 : tipo);
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
            <div className={classes.resultados}>
                <div className={classes.linhaSimples}>
                    <p className={classes.textoClaro}>Plantões encontrados</p>
                    <p className={classes.textoEscuro}>{hospitais === undefined || !Array.isArray(hospitais)
                        ? 0
                        : hospitais.length} plantões
                    </p>
                </div>
                <div className={classes.linhaSimples}>
                    <p className={classes.textoEscuro}>Ordenar por</p>
                    <SelectInputSlim
                        value={ordenarPor}
                        defaultValue={OrdenarPor.Relevancia}
                        handleChange={(e) => setOrdenarPor((e.target as HTMLSelectElement).value as OrdenarPor)}
                        items={ordenarPorValues}
                        keyMap={(item) => item}
                        valueMap={(item) => item}
                    />
                </div>
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
