import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import './styles.css';

import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import { InterfaceCardPlantao } from '../CardHospital';
import api from '../../services/api';

import iconeDptoEmergencia from '../../assets/images/icones/tipoplantao/dptoemergencia.svg';
import iconePacientesInternados from '../../assets/images/icones/tipoplantao/pacientesinternados.svg';
import iconeTransporteInterhospitalar from '../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg';
import ModalAvaliacaoPlantao from '../ModalAvaliacaoPlantao';
import StarRating from '../StarRating';

type DetalhesPlantao = {
    nome: string;
    cnpj: string;
    endereco: string;
    numero: number;
    bairro: string;
    subcategoria: string;
    tipo: number;
    icone: string;
    nota: number;
    numeroAvaliacoes: number;
    infraestrutura: number;
    equipamento: number;
    equipe: number;
    pagamento: number;
    seguranca: number;
    atrasado: number;
    mediaSalarial: number;
};

type ConfiguracaoGraficos = {
    salarioMes: {
        data: ChartData;
        options: ChartOptions;
    },
    salarioDiaSemana: {
        data: ChartData;
        options: ChartOptions;
    }
};

function ModalInfoPlantao ({ plantao }: InterfaceCardPlantao) {
    const [modalAvaliacaoPlantaoAberto, setModalAvaliacaoPlantaoAberto] = useState(false);
    const [informacoes, setInformacoes] = useState<DetalhesPlantao>({
        nome: plantao.nome,
        cnpj: '',
        endereco: '',
        numero: 0,
        bairro: '',
        subcategoria: '',
        tipo: plantao.tipo,
        icone: '',
        nota: 0,
        numeroAvaliacoes: 0,
        infraestrutura: 0,
        equipamento: 0,
        equipe: 0,
        pagamento: 0,
        seguranca: 0,
        atrasado: 0,
        mediaSalarial: 0
    });

    async function loadInfo () {
        try {
            const response = await api.get(`plantoes/${plantao.idPlantao}`);

            setInformacoes({ ...response.data[0] });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadInfo();
    }, []);

    const dados: ConfiguracaoGraficos = {
        salarioMes: {
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
                        pointHitRadius: 8
                    }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
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
                            display: false
                        },
                        offset: true,
                        ticks: {
                            callback: function (value) {
                                if (typeof (value) === 'string') {
                                    return value.charAt(0);
                                }
                            },
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        gridLines: {
                            drawOnChartArea: false,
                            tickMarkLength: 5
                        },
                        ticks: {
                            callback: function (value, index) {
                                if ((index + 1) % 2) {
                                    return 'R$ ' + value;
                                }
                            },
                            beginAtZero: true,
                            fontSize: 10
                        }
                    }]
                }
            }
        },
        salarioDiaSemana: {
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
                        barPercentage: 0.4
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'top',
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
                            display: false
                        },
                        ticks: {
                            callback: function (value) {
                                if (typeof (value) === 'string') {
                                    return value.charAt(0);
                                }
                            }
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        gridLines: {
                            drawOnChartArea: false,
                            tickMarkLength: 5
                        },
                        ticks: {
                            callback: function (value, index) {
                                if ((index + 1) % 2) {
                                    return 'R$ ' + value;
                                }
                            },
                            beginAtZero: true,
                            fontSize: 10
                        }
                    }],
                    gridLines: {
                        drawTicks: false
                    }
                }
            }
        }
    };

    return (
        <div className="modalinfoplantao" style={modalAvaliacaoPlantaoAberto ? { display: 'none' } : {}}>
            <div className="informacoes">
                <div className="detalhes">
                    <div className="nome">
                        <p className="secao">{plantao.nome}</p>
                        <img src={plantao.icone} alt="Plantao"/>
                    </div>
                    <div className="endereco">
                        <p className="secao">Endereço</p>
                        <p className="descricao">{informacoes.endereco}, {informacoes.numero}</p>
                    </div>
                    <div className="inferior">
                        <div className="subdados">
                            <div className="cnpj">
                                <div className="secao">CNPJ</div>
                                <div className="descricao">{informacoes.cnpj}</div>
                            </div>
                            <div className="administrador">
                                <div className="secao">Bairro</div>
                                <div className="descricao">{informacoes.bairro}</div>
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
                    <button onClick={() => setModalAvaliacaoPlantaoAberto(true)}>
                        Nova Avaliação
                    </button>
                </div>
                <div className="sobre">
                    <div className="sumario">Avaliações</div>
                    <div className="itens">
                        <div className="numeroavaliacoes">
                            {informacoes.numeroAvaliacoes === 0
                                ? 'Nenhuma avaliação'
                                : informacoes.numeroAvaliacoes === 1
                                    ? '1 avaliação'
                                    : `${informacoes.numeroAvaliacoes} avaliações`}
                        </div>
                        <div className="item">
                            <div className="rotulo">Infraestrutura</div>
                            <div className="avaliacao">
                                {informacoes.infraestrutura.toFixed(1)}
                                <StarRating value={informacoes.infraestrutura} readonly/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Equipamento</div>
                            <div className="avaliacao">
                                {informacoes.equipamento.toFixed(1)}
                                <StarRating value={informacoes.equipamento} readonly/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Equipe de Saúde</div>
                            <div className="avaliacao">
                                {informacoes.equipe.toFixed(1)}
                                <StarRating value={informacoes.equipe} readonly/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Segurança</div>
                            <div className="avaliacao">
                                {informacoes.seguranca.toFixed(1)}
                                <StarRating value={informacoes.seguranca} readonly/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Pagamento</div>
                            <div className="avaliacao">
                                {informacoes.pagamento.toFixed(1)}
                                <StarRating value={informacoes.pagamento} readonly/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Pagamento em dia</div>
                            <div className="avaliacao">
                                {(1 - informacoes.atrasado) * 100}%
                                <StarRating value={(1 - informacoes.atrasado) * 5} readonly/>
                            </div>
                        </div>
                        <div className="item">
                            <div className="rotulo">Média Salarial</div>
                            <div className="avaliacao">R$ {plantao.media_salarial}/12H</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="avaliacao-plantao">
                        <div className="rotulo">Avaliação</div>
                        <div className="classificacao">
                            <div className="nota">
                                <div className="valor">{plantao.nota}</div>
                                <div className="rodape">/5</div>
                            </div>
                            <StarRating value={plantao.nota} readonly size='large'/>
                        </div>
                    </div>
                </div>
                <div className="analise-salarial">
                    <div className="sumario">Análise salarial</div>
                    <div className="media">
                        <div className="rotulo">Média Salarial</div>
                        <div className="avaliacao">R$ {plantao.media_salarial}/12H</div>
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
            <Dialog
                open={modalAvaliacaoPlantaoAberto}
                onClose={() => { setModalAvaliacaoPlantaoAberto(false); }}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        maxWidth: '720px',
                        minWidth: '500px',
                        width: '35vw',
                        outline: '0'
                    }
                }}
            >
                <ModalAvaliacaoPlantao
                    subcategoria={plantao.subcategoria}
                    idPlantao={plantao.idPlantao}
                    nomeHospital={plantao.nome}
                    onClose={setModalAvaliacaoPlantaoAberto}
                />
            </Dialog>
        </div>
    );
}

export default ModalInfoPlantao;