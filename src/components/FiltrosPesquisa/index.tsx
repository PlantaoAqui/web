import React, { useState } from 'react';
import './styles.css';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";
import iconeAmbulancia from "../../assets/images/icones/tipoplantao/ambulancia.svg";
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Hospital } from "../../pages/plantoes";

export interface HospitaisPesquisados {
    hospitais: Array<Hospital> | undefined;
    // setHospitais: (p: DadosEquipe) => void;
}

function FiltrosPesquisa ({hospitais}: HospitaisPesquisados) {
    const [pesquisaBasicaExpanded, setPesquisaBasicaExpanded] = useState(false);
    const [filtrosExpanded, setFiltrosExpanded] = useState<number | false>(false);
    
    const handleChangeAccordionPesquisaBasica = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setPesquisaBasicaExpanded(isExpanded);
    };
    
    const handleChangeAccordionFiltros = (filtro: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setFiltrosExpanded(isExpanded ? filtro : false);
    };

    return (
        <div className="filtrospesquisa">
            <div className="basepesquisa">
                <Accordion expanded={pesquisaBasicaExpanded} onChange={handleChangeAccordionPesquisaBasica()}>
                    <AccordionSummary>
                        <div className="sumario"
                            aria-label="sumario"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <div className="cabecalho">
                                <p>Plantões encontrados</p>
                                <button onClick={() => setPesquisaBasicaExpanded(!pesquisaBasicaExpanded)}>
                                    {pesquisaBasicaExpanded
                                    ? "Ocultar filtros"
                                    : "Mostrar filtros"}
                                </button>
                            </div>
                            <p>{hospitais === undefined ? 0 : hospitais.length} plantões</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="detalhespesquisa">
                            <div className="local">
                                <h4>LOCAL</h4>
                                <h6>Cidade</h6>
                                <h6>Bairro</h6>
                            </div>
                            <hr/>
                            <div className="subfiltros">
                                <div className="opcao">
                                    <p>Porta</p>24
                                </div>
                                <div className="opcao">
                                    <p>Sala de Emergência</p>12
                                </div>
                                <div className="opcao">
                                    <p>Observação</p>18
                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="tipostitulo">
                <h3>Tipos de plantão</h3>
            </div>
            <div className={filtrosExpanded === 0 ? "dptoemergencia" :"dptoemergencia dptoemergencia-collapsed"}>
                <Accordion expanded={filtrosExpanded === 0} onChange={handleChangeAccordionFiltros(0)}>
                    <AccordionSummary>
                        <div className="sumariofiltro">
                            <img src={iconeDptoEmergencia} alt="Departamento de Emergência"/>
                            <div className="informacoesfiltro">
                                <p className="nomefiltro">Departamento de Emergência</p>
                                <p className="numeroderesultados">23 plantões encontrados</p>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="subfiltros">
                            <div className="opcao">
                                <p>Porta</p>24
                            </div>
                            <div className="opcao">
                                <p>Sala de Emergência</p>12
                            </div>
                            <div className="opcao">
                                <p>Chefe de plantão</p>10
                            </div>
                            <div className="opcao">
                                <p>Observação</p>18
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className={filtrosExpanded === 1 ? "pacientes" : "pacientes pacientes-collapsed"}>
                <Accordion expanded={filtrosExpanded === 1} onChange={handleChangeAccordionFiltros(1)}>
                    <AccordionSummary>
                        <div className="sumariofiltro">
                            <img src={iconePacientesInternados} alt="Pacientes internados"/>
                            <div className="informacoesfiltro">
                                <p className="nomefiltro">Pacientes internados</p>
                                <p className="numeroderesultados">21 plantões encontrados</p>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="subfiltros">
                            <div className="opcao">
                                <p>Enfermaria</p>14
                            </div>
                            <div className="opcao">
                                <p>UTI</p>18
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className={filtrosExpanded === 2 ? "transporte" : "transporte transporte-collapsed"}>
                <Accordion expanded={filtrosExpanded === 2} onChange={handleChangeAccordionFiltros(2)}>
                    <AccordionSummary>
                        <div className="sumariofiltro">
                            <img src={iconeTransporteInterhospitalar} alt="Transporte Interhospitalar"/>
                            <div className="informacoesfiltro">
                                <p className="nomefiltro">Transporte Interhospitalar</p>
                                <p className="numeroderesultados">11 plantões encontrados</p>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="subfiltros">
                            <div className="opcao">
                                <p>Atendimento pré-hospitalar</p>24
                            </div>
                            <div className="opcao">
                                <p>Altas</p>8
                            </div>
                            <div className="opcao">
                                <p>Transporte interhospitalar</p>22
                            </div>
                            <div className="opcao">
                                <p>Aeromédico</p>4
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className={filtrosExpanded === 3 ? "ambulancia" : "ambulancia ambulancia-collapsed"}>
                <Accordion expanded={filtrosExpanded === 3} onChange={handleChangeAccordionFiltros(3)}>
                    <AccordionSummary>
                        <div className="sumariofiltro">
                            <img src={iconeAmbulancia} alt="Ambulância"/>
                            <div className="informacoesfiltro">
                                <p className="nomefiltro">Postos fixos de ambulância</p>
                                <p className="numeroderesultados">11 plantões encontrados</p>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="subfiltros">
                            <div className="opcao">
                                <p>Eventos esportivos e festivos</p>13
                            </div>
                            <div className="opcao">
                                <p>Shoppings</p>15
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="propaganda">
                
            </div>
        </div>
    );
}

export default FiltrosPesquisa;