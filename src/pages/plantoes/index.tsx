import React, { useEffect } from 'react';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import NavBar from '../../components/NavBar';
import makeResponsive from '../../components/Stonecutter/higher-order-components/makeResponsive';
import measureItems from '../../components/Stonecutter/higher-order-components/measureItems';
import SpringGrid from '../../components/Stonecutter/SpringGrid';
import api from '../../services/api';
import './styles.css';

function Plantoes () {
    const array = Array.from(Array(10).keys());

    const Grid = makeResponsive(measureItems(SpringGrid), {
        maxWidth: 3840,
        minPadding: 50,
        widthCoef: 1.6
    });

    async function listarHospitais() {
        try {
            const response = await api.get('hospitais');

            console.log(response);            
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
                <FiltrosPesquisa />
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
                        {array.map(item => {
                            return(
                            <li key={item}>
                                <CardHospital
                                    nomeHospital="Hospital Guaianazes"
                                    tipoHospital={1}
                                    notaHospital={4.63}
                                    mediaSalarialHospital={1245.60}
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