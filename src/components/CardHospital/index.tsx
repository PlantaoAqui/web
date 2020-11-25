import React, { useEffect, useState } from 'react';
import './styles.css';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";
import iconeAmbulancia from "../../assets/images/icones/tipoplantao/ambulancia.svg";

interface InterfaceCardHospital {
    nomeHospital: string;
    tipoHospital: number;
    notaHospital: number;
    mediaSalarialHospital: number;
}

function CardHospital ({nomeHospital, tipoHospital, notaHospital, mediaSalarialHospital}: InterfaceCardHospital) {
    const [iconeHospital, setIconeHospital] = useState('');

    useEffect(() => {
        switch (tipoHospital) {
            case 1:
                setIconeHospital(iconeDptoEmergencia);
                break;
            case 2:
                setIconeHospital(iconePacientesInternados);
                break;
            case 3:
                setIconeHospital(iconeTransporteInterhospitalar);
                break;
            case 4:
                setIconeHospital(iconeAmbulancia);
                break;
            default:
                break;
        }
        
    }, [tipoHospital]);
    
    return (
        <div className="cardhospital">
            <div className="partesuperior">
                <h5>{nomeHospital}</h5>
                <button>Mostrar mais +</button>
            </div>
            <div className="parteinferior">
                <img src={iconeHospital} alt={nomeHospital}/>
                <div className="dadoshospital">
                    <div className="nota">
                        <p className="descricao">Nota</p>
                        <p className="valor">{notaHospital}/5</p>
                    </div>
                    <div className="mediasalarial">
                        <p className="descricao">Média Salarial</p>
                        <p className="valor">R$ {mediaSalarialHospital}/12H</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardHospital;