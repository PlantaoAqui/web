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
    pesquisa: (p: number) => void;
}

function FiltrosPesquisa ({hospitais, pesquisa}: HospitaisPesquisados) {
    const [pesquisaBasicaExpanded, setPesquisaBasicaExpanded] = useState(false);
    const [filtrosExpanded, setFiltrosExpanded] = useState<number | false>(false);

    const handleChangeAccordionPesquisaBasica = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setPesquisaBasicaExpanded(isExpanded);
    };

    const handleClickAccordionFiltros = (tipo: number) => {
        setFiltrosExpanded(filtrosExpanded ? false : tipo);
        pesquisa(filtrosExpanded ? 0 : tipo);
    }

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
                            <p>{hospitais === undefined || !Array.isArray(hospitais)
                                ? 0 : hospitais.length} plantões</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="detalhespesquisa">
                            <div className="local">
                                <p className="descricao">Local</p>
                                <div className="seletor">
                                    <p>Cidade v</p>
                                    <p>Bairro v</p>
                                </div>
                            </div>
                            <div className="subfiltros">
                                <div className="opcao">Avaliação</div>
                                <div className="opcao">
                                    <p>0 {'>'} 2</p>24
                                </div>
                                <div className="opcao">
                                    <p>2 {'>'} 4</p>12
                                </div>
                                <div className="opcao">
                                    <p>4 {'>'} 5</p>18
                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className={filtrosExpanded === 1 ? "dptoemergencia" :"dptoemergencia dptoemergencia-collapsed"}>
                <Accordion expanded={filtrosExpanded === 1}>
                    <AccordionSummary>
                        <div className="filtro"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <div className="cabecalho">
                                <p>Tipo de Plantão</p>
                                <button onClick={() => handleClickAccordionFiltros(1)}>
                                    {filtrosExpanded === 1
                                    ? "- Filtros"
                                    : "+ Filtros"}
                                </button>
                            </div>
                            <div className="sumariofiltro">
                                <img src={iconeDptoEmergencia} alt="Departamento de Emergência"/>
                                <div className="informacoesfiltro">
                                    <p className="nomefiltro">Departamento de Emergência</p>
                                    {filtrosExpanded === 1 && <p className="numeroderesultados">{hospitais?.length} plantões encontrados</p>}
                                </div>
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
            <div className={filtrosExpanded === 2 ? "pacientes" : "pacientes pacientes-collapsed"}>
                <Accordion expanded={filtrosExpanded === 2}>
                    <AccordionSummary>
                        <div className="filtro"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <div className="cabecalho">
                                <p>Tipo de Plantão</p>
                                <button onClick={() => handleClickAccordionFiltros(2)}>
                                    {filtrosExpanded === 2
                                    ? "- Filtros"
                                    : "+ Filtros"}
                                </button>
                            </div>
                            <div className="sumariofiltro">
                                <img src={iconePacientesInternados} alt="Pacientes internados"/>
                                <div className="informacoesfiltro">
                                    <p className="nomefiltro">Departamento de Emergência</p>
                                    {filtrosExpanded === 2 && <p className="numeroderesultados">{hospitais?.length} plantões encontrados</p>}
                                </div>
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
            <div className={filtrosExpanded === 3 ? "transporte" : "transporte transporte-collapsed"}>
                <Accordion expanded={filtrosExpanded === 3}>
                    <AccordionSummary>
                        <div className="filtro"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <div className="cabecalho">
                                <p>Tipo de Plantão</p>
                                <button onClick={() => handleClickAccordionFiltros(3)}>
                                    {filtrosExpanded === 3
                                    ? "- Filtros"
                                    : "+ Filtros"}
                                </button>
                            </div>
                            <div className="sumariofiltro">
                                <img src={iconeTransporteInterhospitalar} alt="Transporte Interhospitalar"/>
                                <div className="informacoesfiltro">
                                    <p className="nomefiltro">Transporte Interhospitalar</p>
                                    {filtrosExpanded === 3 && <p className="numeroderesultados">{hospitais?.length} plantões encontrados</p>}
                                </div>
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
            <div className={filtrosExpanded === 4 ? "ambulancia" : "ambulancia ambulancia-collapsed"}>
                <Accordion expanded={filtrosExpanded === 4}>
                    <AccordionSummary>
                        <div className="filtro"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <div className="cabecalho">
                                <p>Tipo de Plantão</p>
                                <button onClick={() => handleClickAccordionFiltros(4)}>
                                    {filtrosExpanded === 4
                                    ? "- Filtros"
                                    : "+ Filtros"}
                                </button>
                            </div>
                            <div className="sumariofiltro">
                                <img src={iconeAmbulancia} alt="Ambulância"/>
                                <div className="informacoesfiltro">
                                    <p className="nomefiltro">Postos fixos de ambulância</p>
                                    {filtrosExpanded === 4 && <p className="numeroderesultados">{hospitais?.length} plantões encontrados</p>}
                                </div>
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
            <div className="propaganda" />
        </div>
    );
}

export default FiltrosPesquisa;
