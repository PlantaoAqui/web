import React, { useState } from 'react';
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

const Grid = makeResponsive(measureItems(SpringGrid), {
    maxWidth: 3840,
    minPadding: 50,
    widthCoef: 1.6
});

function Plantoes () {
    const search = useSearch();
    const [debouncedSearch] = useDebounce(search.dados, 500);
    const [blurBackground, setBlurBackground] = useState(false);

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
        <div className="page-plantoes" style={blurBackground ? { filter: 'blur(3px)' } : {}}>
            <NavBar tipoLinks="default" aba={1}/>
            <div className="pesquisaplantoes">
                <FiltrosPesquisa
                    resultados={pesquisarPlantoes.result?.data.resultados}
                    count={pesquisarPlantoes.result?.data.count}
                />
                {pesquisarPlantoes.result?.data &&
                    pesquisarPlantoes.result.data.resultados > 0
                    ? (
                        <span className="gridcontainer">
                            <Grid
                                className="grid"
                                component="ul"
                                columns={2}
                                columnWidth={250}
                                itemHeight={145}
                                gutterWidth={13}
                                gutterHeight={13}
                                springConfig={{ stiffness: 170, damping: 26 }}
                            >
                                {(pesquisarPlantoes.result.data.plantoes as Plantao[]).map(cardPlantao => {
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
                {/* )} */}
            </div>
        </div>
    );
}

export default Plantoes;
