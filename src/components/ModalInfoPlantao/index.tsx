import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './styles.css';

import Dialog from '@material-ui/core/Dialog';
import { InterfaceCardPlantao } from '../CardHospital';
import api from '../../services/api';

import ModalAvaliacaoPlantao from '../ModalAvaliacaoPlantao';
import StarRating from '../StarRating';
import ComentariosPlantao, { comentario } from '../ComentariosPlantao';
import Typography from '@material-ui/core/Typography';
import { IconButton, Tooltip } from '@material-ui/core';

import MapIcon from '@material-ui/icons/Map';
import Button from '../Button';

type DetalhesPlantao = {
    idPlantao: number;
    idHospital: number;
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
    tambem: Array<{
        idPlantao: number,
        idSubcategoria: number,
        nome: string,
        icone: string
    }>;
    comentarios: comentario[];
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

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '80vh',
            overflow: 'hidden'
        },
        cardInfo: {
            background: 'var(--cor-fundo-card)',
            maxHeight: '475px',
            maxWidth: '350px',
            borderRadius: '8px',
            width: 'calc((100% - 30px)/3)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        sumarioPlantao: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '2.8rem'
        },
        infoHospitalContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'auto'
        },
        iconePlantao: {
            width: '4.8rem',
            height: 'auto'
        },
        sumarioTooltip: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center'
        },
        infoHospital: {
            alignSelf: 'flex-start',
            marginBottom: '1.2rem'
        },
        infoHospitalDupla: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            marginBottom: '1.2rem'
        },
        infoHospitalDuplaItem: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'flex-start'
        },
        tiposPlantao: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            '& img': {
                width: '3rem',
                height: 'auto',
                display: 'cover'
            }
        }
    })
);

function ModalInfoPlantao ({ plantao }: InterfaceCardPlantao) {
    const classes = useStyles();
    const [modalAvaliacaoPlantaoAberto, setModalAvaliacaoPlantaoAberto] = useState(false);
    const [idPlantao, setIdPlantao] = useState(plantao.idPlantao);
    const [subcategoriaPlantao, setsubcategoriaPlantao] = useState(plantao.subcategoria);
    const [iconePlantao, setIconePlantao] = useState(plantao.icone);
    const [informacoes, setInformacoes] = useState<DetalhesPlantao | null>(null);

    async function loadInfo () {
        try {
            const response = await api.get(`plantoes/${idPlantao}`);

            setInformacoes({ ...response.data });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadInfo();
    }, [idPlantao]);

    function abrirGoogleMaps () {
        const url = 'https://www.google.com/maps/search/?api=1&query=';
        const endereco = informacoes?.endereco + ', ' + informacoes?.numero + ' ' + informacoes?.bairro;
        endereco.replace(' ', '+').replace(',', '%2C');
        window.open(url + endereco, '_blank');
    }

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
        <div style={modalAvaliacaoPlantaoAberto ? { display: 'none' } : {}}>
            {informacoes && (
                <div className="informacoes">
                    <div className={classes.cardInfo}>
                        <div className={classes.sumarioPlantao}>
                            <Typography color="textPrimary"
                                variant="h5" gutterBottom
                            >
                                {plantao.nome}
                            </Typography>
                            <img className={classes.iconePlantao}
                                src={iconePlantao} alt="Plantao"
                            />
                        </div>
                        <div className={classes.infoHospitalContainer}>
                            <div className={classes.infoHospital}>
                                <Typography color="textPrimary"
                                    variant="h6"
                                >
                                    Tipo de plantão
                                </Typography>
                                <Typography color="textSecondary"
                                    variant="h6" gutterBottom
                                >
                                    {informacoes.subcategoria}
                                </Typography>
                            </div>
                            <div className={classes.infoHospital}>
                                <div className={classes.sumarioTooltip}>
                                    <Typography color="textPrimary"
                                        variant="h6"
                                        style={{ marginRight: '0.6rem' }}
                                    >
                                        Endereço
                                    </Typography>
                                    <Tooltip arrow
                                        title={
                                            <Typography
                                                variant="subtitle1"
                                            >
                                                Abrir no maps
                                            </Typography>
                                        }
                                    >
                                        <IconButton
                                            onClick={abrirGoogleMaps}
                                            aria-label="endereco"
                                            style={{ padding: 0 }}
                                        >
                                            <MapIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <Typography color="textSecondary"
                                    variant="h6" gutterBottom
                                >
                                    {informacoes.endereco}, {informacoes.numero}
                                </Typography>
                            </div>
                            <div className={classes.infoHospitalDupla}>
                                <div className={classes.infoHospitalDuplaItem}>
                                    <Typography color="textPrimary"
                                        variant="h6"
                                    >
                                        CNPJ
                                    </Typography>
                                    <Typography color="textSecondary"
                                        variant="h6" gutterBottom
                                    >
                                        {parseInt(informacoes.cnpj) === 0 ? '-' : informacoes.cnpj}
                                    </Typography>
                                </div>
                                <div className={classes.infoHospitalDuplaItem}>
                                    <Typography color="textPrimary"
                                        variant="h6"
                                    >
                                        Bairro
                                    </Typography>
                                    <Typography color="textSecondary"
                                        variant="h6" gutterBottom
                                    >
                                        {informacoes.bairro}
                                    </Typography>
                                </div>
                            </div>
                            {informacoes.tambem.length > 0 && (
                                <div className={classes.infoHospital}>
                                    <Typography color="textPrimary"
                                        variant="h6" gutterBottom
                                    >
                                        Também desse hospital
                                    </Typography>
                                    <div className={classes.tiposPlantao}>
                                        {informacoes.tambem.map(plantaoOferecido => {
                                            return (
                                                <Tooltip arrow
                                                    key={plantaoOferecido.idPlantao}
                                                    title={
                                                        <Typography
                                                            variant="subtitle1"
                                                        >
                                                            {plantaoOferecido.nome}
                                                        </Typography>
                                                    }
                                                >
                                                    <IconButton
                                                        onClick={() => {
                                                            setIdPlantao(plantaoOferecido.idPlantao);
                                                            setIconePlantao(plantaoOferecido.icone);
                                                            setsubcategoriaPlantao(plantaoOferecido.idSubcategoria);
                                                        }}
                                                        aria-label="plantao"
                                                        style={{ padding: 0 }}
                                                    >
                                                        <img
                                                            src={plantaoOferecido.icone}
                                                            alt="Plantao"
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button
                            texto="Nova Avaliação"
                            type="submit"
                            onClick={() => setModalAvaliacaoPlantaoAberto(true)}
                        />
                    </div>
                    <div className="sobre">
                        <div className="sumario">
                            <p>Avaliações</p>
                            <div className="numeroavaliacoes">
                                {informacoes.numeroAvaliacoes === 0
                                    ? 'Nenhuma avaliação'
                                    : informacoes.numeroAvaliacoes === 1
                                        ? '1 avaliação'
                                        : `${informacoes.numeroAvaliacoes} avaliações`}
                            </div>
                        </div>
                        <div className="itens">
                            <div className="item">
                                <div className="rotulo">Infraestrutura</div>
                                <div className="avaliacao">
                                    {informacoes.infraestrutura?.toFixed(1)}
                                    <StarRating value={informacoes.infraestrutura} readonly/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="rotulo">Equipamento</div>
                                <div className="avaliacao">
                                    {informacoes.equipamento?.toFixed(1)}
                                    <StarRating value={informacoes.equipamento} readonly/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="rotulo">Equipe de Saúde</div>
                                <div className="avaliacao">
                                    {informacoes.equipe?.toFixed(1)}
                                    <StarRating value={informacoes.equipe} readonly/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="rotulo">Segurança</div>
                                <div className="avaliacao">
                                    {informacoes.seguranca?.toFixed(1)}
                                    <StarRating value={informacoes.seguranca} readonly/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="rotulo">Pagamento</div>
                                <div className="avaliacao">
                                    {informacoes.pagamento?.toFixed(1)}
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
            )}
            {informacoes && informacoes.comentarios && (
                <ComentariosPlantao
                    id_hospital_avaliado={informacoes.idPlantao}
                    comentarios={informacoes.comentarios}
                    reload={loadInfo}
                />
            )}
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
                    subcategoria={subcategoriaPlantao}
                    idPlantao={plantao.idPlantao}
                    idHospital={informacoes?.idHospital}
                    nomeHospital={plantao.nome}
                    onClose={setModalAvaliacaoPlantaoAberto}
                />
            </Dialog>
        </div>
    );
}

export default ModalInfoPlantao;
