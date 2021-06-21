import React, { useEffect, useState } from 'react';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import NavBar from '../../components/NavBar';
import makeResponsive from '../../components/Stonecutter/higher-order-components/makeResponsive';
import measureItems from '../../components/Stonecutter/higher-order-components/measureItems';
import SpringGrid from '../../components/Stonecutter/SpringGrid';
import './styles.css';

import logoCinza from '../../assets/images/logos/plantaoFacilCinza.svg';
import { Typography } from '@material-ui/core';
import api from '../../services/api';
import useSearch from '../../hooks/use-search';
import { useDebounce } from 'use-debounce/lib';

export interface Plantao {
    idPlantao: number;
    nome: string;
    tipo: number;
    subcategoria: number;
    icone: string;
    nota: number;
    media_salarial: number;
}

const Grid = makeResponsive(measureItems(SpringGrid), {
    maxWidth: 3840,
    minPadding: 50,
    widthCoef: 1.6
});

function Plantoes () {
    const search = useSearch();
    const [debouncedSearch] = useDebounce(search.dados, 500);
    const [plantoes, setPlantoes] = useState<Plantao[]>([]);
    const [blurBackground, setBlurBackground] = useState(false);

    async function pesquisarPlantoes () {
        const { ordenarPor, uf, municipio, nota, tipo, subcategoria } = search.dados;
        const { intervaloRemuneracao, like } = debouncedSearch;

        if (uf === 0 || municipio === 0) return;

        try {
            const response = await api.get('plantoes', {
                params: {
                    remuneracaoMin: intervaloRemuneracao[0],
                    remuneracaoMax: intervaloRemuneracao[1],
                    ordenarPor,
                    like,
                    uf,
                    municipio,
                    nota,
                    tipo,
                    subcategoria
                }
            });
            setPlantoes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        pesquisarPlantoes();
    }, [
        debouncedSearch.intervaloRemuneracao,
        debouncedSearch.like,
        search.dados.ordenarPor,
        search.dados.uf,
        search.dados.municipio,
        search.dados.nota,
        search.dados.tipo,
        search.dados.subcategoria
    ]);

    return (
        <div className="page-plantoes" style={blurBackground ? { filter: 'blur(3px)' } : {}}>
            <NavBar tipoLinks="default" aba={1}/>
            <div className="pesquisaplantoes">
                <FiltrosPesquisa plantoes={plantoes} setPlantoes={setPlantoes}/>
                {Array.isArray(plantoes) && plantoes.length > 0
                    ? (
                        <span className="gridcontainer">
                            <Grid
                                className="grid"
                                component="ul"
                                columns={2}
                                columnWidth={250}
                                itemHeight={125}
                                gutterWidth={13}
                                gutterHeight={13}
                                springConfig={{ stiffness: 170, damping: 26 }}
                            >
                                {plantoes.map(cardPlantao => {
                                    return (
                                        <li key={cardPlantao.idPlantao}>
                                            <CardHospital
                                                plantao={cardPlantao}
                                                blurBackground={setBlurBackground}
                                            />
                                        </li>

                                    );
                                })}
                            </Grid>
                        </span>
                    )
                    : (
                        <div className="sem-resultados">
                            <img src={logoCinza} alt="Plantão Fácil" />
                            <Typography variant="subtitle1" color="textSecondary">
                                Nenhum plantão foi encontrado para essa pesquisa
                            </Typography>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Plantoes;
