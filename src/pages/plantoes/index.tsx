import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import NavBar from '../../components/NavBar';
import makeResponsive from '../../components/Stonecutter/higher-order-components/makeResponsive';
import measureItems from '../../components/Stonecutter/higher-order-components/measureItems';
import SpringGrid from '../../components/Stonecutter/SpringGrid';
import api from '../../services/api';
import './styles.css';

export interface Hospital {
    idCard: number;
    id: number;
    nome: string;
    tipo: number;
    nota: number;
    salario: number;
}

const Grid = makeResponsive(measureItems(SpringGrid), {
    maxWidth: 3840,
    minPadding: 50,
    widthCoef: 1.6
});

function Plantoes () {
    const [hospitais, setHospitais] = useState<Hospital[]>();
    const [blurBackground, setBlurBackground] = useState(false);

    async function pesquisarHospitais(filtro: number) {
        try {
            const response = await api.get('hospitais', {
                params: {
                    filtro
                }
            });

            setHospitais(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarHospitais() {
        try {
            const response = await api.get('hospitais');

            setHospitais(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarHospitais();
    }, []);

    return (
        <div className="page-plantoes" style={blurBackground ? {filter: 'blur(3px)'} : {}}>
            <NavBar aba={1}/>
            <div className="pesquisaplantoes">
                <FiltrosPesquisa hospitais={hospitais} pesquisa={pesquisarHospitais}/>
                <span className="gridcontainer">
                    <Grid
                        className="grid"
                        component="ul"
                        columns={2}
                        columnWidth={250}
                        itemHeight={125}
                        gutterWidth={13}
                        gutterHeight={13}
                        springConfig={{stiffness: 170, damping: 26}}
                    >
                        {Array.isArray(hospitais) && hospitais.map(cardHospital => {
                            return(
                            <li key={cardHospital.idCard}>
                                <CardHospital
                                    idHospital={cardHospital.id}
                                    nomeHospital={cardHospital.nome}
                                    tipoPlantao={cardHospital.tipo}
                                    notaHospital={cardHospital.nota}
                                    mediaSalarialHospital={cardHospital.salario}
                                    blurBackground={setBlurBackground}
                                />
                            </li>

                            );
                        })}
                    </Grid>
                </span>
            </div>
        </div>
    );
}

export default Plantoes;
