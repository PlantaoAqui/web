import React, { useEffect, useState } from 'react';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import NavBar from '../../components/NavBar';
import makeResponsive from '../../components/Stonecutter/higher-order-components/makeResponsive';
import measureItems from '../../components/Stonecutter/higher-order-components/measureItems';
import SpringGrid from '../../components/Stonecutter/SpringGrid';
import api from '../../services/api';
import './styles.css';

export interface Hospital {
    id_card: number;
    id: number;
    nome: string;
    tipo: number;
    nota: number;
    salario: number;
}

function Plantoes () {
    const [hospitais, setHospitais] = useState<Hospital[]>();

    const Grid = makeResponsive(measureItems(SpringGrid), {
        maxWidth: 3840,
        minPadding: 50,
        widthCoef: 1.6
    });

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
        <div className="page-plantoes">
            <NavBar aba={1}/>
            <div className="pesquisaplantoes">
                <FiltrosPesquisa hospitais={hospitais} pesquisa={pesquisarHospitais}/>
                <span className="gridcontainer">
                    <Grid
                        className="grid"
                        component="ul"
                        columns={2}
                        columnWidth={230}
                        itemHeight={120}
                        gutterWidth={13}
                        gutterHeight={13}
                        springConfig={{stiffness: 170, damping: 26}}
                    >
                        {hospitais !== undefined && hospitais.map(cardHospital => {
                            return(
                            <li key={cardHospital.id_card}>
                                <CardHospital
                                    nomeHospital={cardHospital.nome}
                                    tipoHospital={cardHospital.tipo}
                                    notaHospital={cardHospital.nota}
                                    mediaSalarialHospital={cardHospital.salario}
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