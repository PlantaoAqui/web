import React, { useEffect, useState } from 'react';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import NavBar from '../../components/NavBar';
import makeResponsive from '../../components/Stonecutter/higher-order-components/makeResponsive';
import measureItems from '../../components/Stonecutter/higher-order-components/measureItems';
import SpringGrid from '../../components/Stonecutter/SpringGrid';
import api from '../../services/api';
import './styles.css';

import logoCinza from '../../assets/images/logos/plantaoFacilCinza.svg';
import { Typography } from '@material-ui/core';

export interface Hospital {
    idPlantao: number;
    nome: string;
    tipo: number;
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
    const [hospitais, setHospitais] = useState<Hospital[]>();
    const [blurBackground, setBlurBackground] = useState(false);

    async function pesquisarHospitais () {
        try {
            const response = await api.get('plantoes');

            setHospitais(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        pesquisarHospitais();
    }, []);

    return (
        <div className="page-plantoes" style={blurBackground ? { filter: 'blur(3px)' } : {}}>
            <NavBar tipoLinks="default" aba={1}/>
            <div className="pesquisaplantoes">
                <FiltrosPesquisa hospitais={hospitais} pesquisa={pesquisarHospitais}/>
                {Array.isArray(hospitais) && hospitais.length > 0
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
                                {hospitais.map(cardHospital => {
                                    return (
                                        <li key={cardHospital.idPlantao}>
                                            <CardHospital
                                                hospital={cardHospital}
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
