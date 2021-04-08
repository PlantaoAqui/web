import { Avatar } from '@material-ui/core';
import React, { createRef, useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2'
import { ChartOptions, ChartData } from 'chart.js'
import './styles.css';

import { InterfaceCardHospital } from '../CardHospital';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";
import api from '../../services/api';

interface DetalhesHospital {
    nome: string;
    endereco: string;
    cnpj: string;
    responsavel: string;
    infraestrutura: number;
    equipamento: number;
    equipe: number;
    pagamento: number;
    seguranca: number;
}

type ConfiguracaoGraficos = {
    salarioMes: {
        data: ChartData;
        options: ChartOptions;
    },
    salarioDiaSemana: {
        data: ChartData;
        options: ChartOptions;
    }
}

function ModalInfoHospital ({idHospital, nomeHospital, tipoHospital, notaHospital, mediaSalarialHospital}: InterfaceCardHospital) {
    const salarioMes = createRef();
    const [informacoes, setInformacoes] = useState<DetalhesHospital>({
        nome: nomeHospital,
        endereco: '',
        cnpj: '',
        responsavel: '',
        infraestrutura: 0,
        equipamento: 0,
        equipe: 0,
        pagamento: 0,
        seguranca: 0
    });

    async function loadInfo() {
        try {
            const response = await api.get(`hospitais/${idHospital}`, {
                params: {
                    tipo: tipoHospital
                }
            });

            setInformacoes({ idHospital, ...response.data[0] });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadInfo();
    }, []);

    const dados: ConfiguracaoGraficos = {
        salarioMes : {
            data: {
                labels: [
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ],
                datasets: [
                {
                    label: 'Salário/Mês',
                    data: [1200, 1900, 300, 500, 1200, 1300, 400, 1600, 300, 600, 1300, 1400],
                    fill: false,
                    borderColor: '#5D9550',
                    pointBackgroundColor: '#5D9550',
                    showLine: true,
                    lineTension: 0,
                    pointRadius: 0,
                    pointHitRadius: 8,
                },
                ],
            },
            options: {
                legend: {
                    display: true,
                    position: "top",
                    align: 'start',
                    onClick: (e) => e.stopPropagation(),
                    labels: {
                        boxWidth: 0
                    }
                },
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        gridLines: {
                            display: false,
                        },
                        offset: true,
                        ticks: {
                            callback: function(value, index, values) {
                                if(typeof(value) === 'string'){
                                    return value.charAt(0);
                                }
                            },
                            fontSize: 10,
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        gridLines: {
                            drawOnChartArea: false,
                            tickMarkLength: 5,
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                if (!!((index + 1)%2)) {
                                    return 'R$ ' + value;
                                }
                            },
                            beginAtZero: true,
                            fontSize: 10,
                        }
                    }],
                },
            }
        },
        salarioDiaSemana : {
            data: {
                labels: [
                    'Segunda',
                    'Terça',
                    'Quarta',
                    'Quinta',
                    'Sexta',
                    'Sábado',
                    'Domingo'
                ],
                datasets: [
                {
                    label: 'Salário/Dia da Semana',
                    data: [7, 2, 6, 3, 6, 3, 4],
                    backgroundColor: '#5D9550',
                    barPercentage: 0.4,
                },
                ],
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: "top",
                    align: 'start',
                    onClick: (e) => e.stopPropagation(),
                    labels: {
                        boxWidth: 0
                    }
                },
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                if(typeof(value) === 'string'){
                                    return value.charAt(0);
                                }
                            },
                        },
                    }],
                    yAxes: [{
                        position: 'right',
                        gridLines: {
                            drawOnChartArea: false,
                            tickMarkLength: 5,
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                if (!!((index + 1)%2)) {
                                    return 'R$ ' + value;
                                }
                            },
                            beginAtZero: true,
                            fontSize: 10,
                        },
                    }],
                    gridLines: {
                        drawTicks: false,
                    }
                },
            }
        }
    }
    return (
        <div className="modalinfohospital">
            <div className="informacoes">
                <div className="detalhes">
                    <div className="nome">
                        <p className="secao">{nomeHospital}</p>
                        <img src={iconeDptoEmergencia} alt="Hospital"/>
                    </div>
                    <div className="endereco">
                        <p className="secao">Endereço</p>
                        <p className="descricao">{informacoes.endereco}</p>
                    </div>
                    <div className="inferior">
                        <div className="subdados">
                            <div className="cnpj">
                                <div className="secao">CNPJ</div>
                                <div className="descricao">{informacoes.cnpj}</div>
                            </div>
                            <div className="administrador">
                                <div className="secao">Administrador do Plantão</div>
                                <div className="descricao">{informacoes.responsavel}</div>
                            </div>
                        </div>
                        <div className="linkicones">
                            <div className="tiposplantao">
                                <div className="secao">Tipos de Plantão</div>
                                <div className="icones">
                                    <img src={iconeDptoEmergencia} alt="Departamento de emergência"/>
                                    <img src={iconePacientesInternados} alt="Pacientes internados"/>
                                    <img src={iconeTransporteInterhospitalar} alt="Transporte interhospitalar"/>
                                </div>
                            </div>
                            <div className="compartilhar">
                                <div className="secao">Compartilhar</div>
                                <div className="icones">
                                    <div className="icone"></div>
                                    <div className="icone"></div>
                                    <div className="icone"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button>
                        Nova Avaliação
                    </button>
                </div>
                <div className="sobre">
                    <div className="sumario">Avaliações</div>
                    <div className="itens">
                        <div className="numeroavaliacoes">
                            31 avaliações
                        </div>
                        <div className="item">
                            <div className="rotulo">Infraestrutura</div>
                            <div className="avaliacao">{informacoes.infraestrutura.toFixed(1)}</div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Equipamento</div>
                            <div className="avaliacao">{informacoes.equipamento.toFixed(1)}</div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Equipe de Saúde</div>
                            <div className="avaliacao">{informacoes.equipe.toFixed(1)}</div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Segurança</div>
                            <div className="avaliacao">{informacoes.seguranca.toFixed(1)}</div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Pagamento</div>
                            <div className="avaliacao">{informacoes.pagamento.toFixed(1)}</div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Pagamento em dia</div>
                            <div className="avaliacao">3,0</div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Média Salarial</div>
                            <div className="avaliacao">R$ {mediaSalarialHospital}/12H</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="avaliacao-hospital">
                        <div className="rotulo">Avaliação</div>
                        <div className="nota">{notaHospital}/5</div>
                    </div>
                </div>
                <div className="analise-salarial">
                    <div className="sumario">Análise salarial</div>
                    <div className="media">
                        <div className="rotulo">Média Salarial</div>
                        <div className="avaliacao">R$ {mediaSalarialHospital}/12H</div>
                    </div>
                    <div className="salario-mes">
                        <Line data={dados.salarioMes.data} options={dados.salarioMes.options} />
                    </div>
                    <div className="salario-dia-semana">
                        <Bar data={dados.salarioDiaSemana.data} options={dados.salarioDiaSemana.options} />
                    </div>
                </div>
            </div>
            <div className="secaocomentarios">
                <div className="sumario">
                    <h1>Comentários</h1>
                    <p>23 comentários</p>
                </div>
                <div className="comentarios">
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalInfoHospital;
