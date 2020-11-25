import React from 'react';
import CardHospital from '../../components/CardHospital';
import FiltrosPesquisa from '../../components/FiltrosPesquisa';
import NavBar from '../../components/NavBar';
import './styles.css';

function Plantoes () {
    return (
        <div className="page-plantoes">
            <NavBar aba={1}/>
            <div className="pesquisaplantoes">
                <FiltrosPesquisa />
                <CardHospital
                    nomeHospital="Hospital Guaianazes"
                    tipoHospital={1}
                    notaHospital={4.63}
                    mediaSalarialHospital={1245.60}
                />
                <CardHospital
                    nomeHospital="UBS Jaraguá"
                    tipoHospital={2}
                    notaHospital={4.63}
                    mediaSalarialHospital={1621.60}
                />
                <CardHospital
                    nomeHospital="MED SAFE Ambulâncias"
                    tipoHospital={3}
                    notaHospital={3.67}
                    mediaSalarialHospital={958.45}
                />
            </div>
        </div>
    );
}

export default Plantoes;