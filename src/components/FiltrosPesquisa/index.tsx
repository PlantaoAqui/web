import React from 'react';
import './styles.css';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";
import iconeAmbulancia from "../../assets/images/icones/tipoplantao/ambulancia.svg";

function FiltrosPesquisa () {
    return (
        <div className="filtrospesquisa">
            <div className="basepesquisa">
                <div className="cabecalho">
                    <p>Plantões encontrados</p>
                    <button>Mostrar Filtros</button>
                </div>
                <p>123 plantões</p>
            </div>
            <div className="dptoemergencia">
                <div className="cabecalho">
                    <p>Tipo de Plantão</p>
                    <button>+ Filtros</button>
                </div>
                <div className="detalhesfiltro">
                    <img src={iconeDptoEmergencia} alt="Departamento de Emergência"/>
                    <div className="informacoesfiltro">
                        <p className="nomefiltro">Departamento de Emergência</p>
                        <p className="numeroderesultados">23 plantões encontrados</p>
                    </div>
                </div>
            </div>
            <div className="pacientes">
                <div className="cabecalho">
                    <p>Tipo de Plantão</p>
                    <button>+ Filtros</button>
                </div>
                <div className="detalhesfiltro">
                    <img src={iconePacientesInternados} alt="Pacientes internados"/>
                    <div className="informacoesfiltro">
                        <p className="nomefiltro">Pacientes internados</p>
                        <p className="numeroderesultados">21 plantões encontrados</p>
                    </div>
                </div>
            </div>
            <div className="transporte">
                <div className="cabecalho">
                    <p>Tipo de Plantão</p>
                    <button>+ Filtros</button>
                </div>
                <div className="detalhesfiltro">
                    <img src={iconeTransporteInterhospitalar} alt="Transporte Interhospitalar"/>
                    <div className="informacoesfiltro">
                        <p className="nomefiltro">Transporte Interhospitalar</p>
                        <p className="numeroderesultados">11 plantões encontrados</p>
                    </div>
                </div>
            </div>
            <div className="ambulancia">
                <div className="cabecalho">
                    <p>Tipo de Plantão</p>
                    <button>+ Filtros</button>
                </div>
                <div className="detalhesfiltro">
                    <img src={iconeAmbulancia} alt="Ambulância"/>
                    <div className="informacoesfiltro">
                        <p className="nomefiltro">Ambulância</p>
                        <p className="numeroderesultados">11 plantões encontrados</p>
                    </div>
                </div>
            </div>
            <div className="propaganda">
                
            </div>
        </div>
    );
}

export default FiltrosPesquisa;