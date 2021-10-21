import React, { useEffect, useRef, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './styles.css';

import api from '../../services/api';

import ModalAvaliacaoPlantao from '../ModalAvaliacaoPlantao';
import StarRating from '../StarRating';
import ComentariosPlantao, { comentario } from '../ComentariosPlantao';
import Typography from '@material-ui/core/Typography';
import { Dialog, IconButton, Tooltip } from '@material-ui/core';

import MapIcon from '@material-ui/icons/Map';
import Button from '../Button';
import LinhaReview from './components/LinhaReview';
import CloseIcon from '@material-ui/icons/Close';
import { Plantao } from '../../pages/plantoes';

type ModalInfoPlantaoProps = {
    plantao: Plantao;
    open: boolean;
    onClose: () => void;
};

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

const useStyles = makeStyles(theme =>
    createStyles({
        dialogPaper: {
            backgroundColor: 'transparent',
            width: '80vw',
            maxWidth: '930px',
            minWidth: '720px',
            marginTop: '11.2rem',
            overflow: 'unset',
            outline: '0',
            boxShadow: 'none',
            [theme.breakpoints.up('lg')]: {
                width: 'calc(58.4vw - 1.2rem)',
                margin: '11.2rem 21.6vw 0 calc(31.6vw + 1.2rem)'
            },
            [theme.breakpoints.up('xl')]: {
                margin: '11.2rem 21.6vw 0 31.6vw'
            }
        },
        root: {
            height: '80vh',
            overflow: 'hidden',
            position: 'relative'
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
            marginBottom: theme.spacing(6)
        },
        infoHospitalContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        iconePlantao: {
            width: '4.8rem',
            height: 'auto',
            marginLeft: theme.spacing(4)
        },
        sumarioTooltip: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center'
        },
        infoHospital: {
            alignSelf: 'flex-start',
            marginBottom: theme.spacing(3)
        },
        infoHospitalDupla: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            marginBottom: theme.spacing(3)
        },
        infoHospitalDuplaItem: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start'
        },
        notaAvaliacao: {
            borderTop: `1px solid ${theme.palette.divider}`,
            paddingTop: theme.spacing(5),
            width: '100%'
        },
        rodapeAvaliacao: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
        },
        grafico: {
            width: '100%',
            marginBottom: theme.spacing(3)
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
        },
        closeButtonContainer: {
            position: 'absolute',
            top: -theme.spacing(4),
            left: -theme.spacing(3),
            width: '2.8rem',
            height: '2.8rem',
            borderRadius: '50%',
            background: theme.palette.grey[400]
        },
        closeButton: {
            width: '100%',
            height: '100%'
        }
    })
);

function ModalInfoPlantao ({ plantao, open, onClose }: ModalInfoPlantaoProps) {
    const classes = useStyles();
    const didMount = useRef(false);
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
                labels: getMonthsArray(),
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

    useEffect(() => {
        didMount.current
            ? (
                document.getElementById('root')?.style.setProperty(
                    'filter',
                    open ? 'blur(3px)' : 'blur(0px)')
            )
            : (
                didMount.current = true
            );
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{
                className: classes.dialogPaper
            }}
        >
            <div style={modalAvaliacaoPlantaoAberto ? { display: 'none' } : {}}>
                {informacoes && (
                    <div className="informacoes">
                        <div className={classes.cardInfo}>
                            <div className={classes.sumarioPlantao}>
                                <Typography color="textPrimary"
                                    variant="subtitle1" style={{ lineHeight: 1.25 }}
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
                                        variant="body1" gutterBottom
                                    >
                                        Tipo de plantão
                                    </Typography>
                                    <Typography color="textSecondary"
                                        variant="body1" gutterBottom
                                    >
                                        {informacoes.subcategoria}
                                    </Typography>
                                </div>
                                <div className={classes.infoHospital}>
                                    <div className={classes.sumarioTooltip}>
                                        <Typography color="textPrimary"
                                            variant="body1"
                                            style={{ marginRight: '0.6rem' }}
                                        >
                                            Endereço
                                        </Typography>
                                        <Tooltip arrow
                                            title={
                                                <Typography
                                                    variant="subtitle2"
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
                                        variant="body1" gutterBottom
                                    >
                                        {informacoes.endereco}, {informacoes.numero}
                                    </Typography>
                                </div>
                                <div className={classes.infoHospitalDupla}>
                                    <div className={classes.infoHospitalDuplaItem}>
                                        <Typography color="textPrimary"
                                            variant="body1" gutterBottom
                                        >
                                            CNPJ
                                        </Typography>
                                        <Typography color="textSecondary"
                                            variant="body1"
                                        >
                                            {parseInt(informacoes.cnpj) === 0 ? '-' : informacoes.cnpj}
                                        </Typography>
                                    </div>
                                    <div className={classes.infoHospitalDuplaItem}>
                                        <Typography color="textPrimary"
                                            variant="body1" gutterBottom
                                        >
                                            Bairro
                                        </Typography>
                                        <Typography color="textSecondary"
                                            variant="body1"
                                        >
                                            {informacoes.bairro}
                                        </Typography>
                                    </div>
                                </div>
                                {informacoes.tambem.length > 0
                                    ? (
                                        <div className={classes.infoHospital}>
                                            <Typography color="textPrimary"
                                                variant="body1" gutterBottom
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
                                                                    variant="subtitle2"
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
                                    )
                                    : (
                                        <div style={{ height: '5rem' }} />
                                    )}
                            </div>
                            <Button
                                texto="Nova Avaliação"
                                type="submit"
                                background="#7BB2ED"
                                onClick={() => setModalAvaliacaoPlantaoAberto(true)}
                            />
                        </div>
                        <div className={classes.cardInfo}>
                            <div className={classes.sumarioPlantao}
                                style={{ alignItems: 'center' }}
                            >
                                <Typography color="textPrimary"
                                    variant="h6"
                                >
                                    Avaliações
                                </Typography>
                                <Typography color="textSecondary"
                                    variant="body1"
                                >
                                    {informacoes.numeroAvaliacoes === 0
                                        ? 'Nenhuma avaliação'
                                        : informacoes.numeroAvaliacoes === 1
                                            ? '1 avaliação'
                                            : `${informacoes.numeroAvaliacoes} avaliações`}
                                </Typography>
                            </div>
                            <div className={classes.infoHospitalContainer}>
                                <LinhaReview
                                    legenda="Infraestrutura"
                                    nota={informacoes.infraestrutura || 0}
                                />
                                <LinhaReview
                                    legenda="Equipamento"
                                    nota={informacoes.equipamento || 0}
                                />
                                <LinhaReview
                                    legenda="Equipe de saúde"
                                    nota={informacoes.equipe || 0}
                                />
                                <LinhaReview
                                    legenda="Segurança"
                                    nota={informacoes.seguranca || 0}
                                />
                                <LinhaReview
                                    legenda="Pagamento"
                                    nota={informacoes.pagamento || 0}
                                />
                                <div className={classes.infoHospitalDupla}>
                                    <Typography color="textPrimary"
                                        variant="body1"
                                    >
                                        Pagamento em dia
                                    </Typography>
                                    <Typography color="textPrimary"
                                        variant="body1"
                                    >
                                        {(1 - informacoes.atrasado) * 100}% Sim
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.notaAvaliacao}>
                                <Typography color="textPrimary"
                                    variant="body1" gutterBottom
                                >
                                    Avaliação final:
                                </Typography>
                                <div className={classes.rodapeAvaliacao}>
                                    <div className={classes.rodapeAvaliacao}>
                                        <Typography color="textPrimary"
                                            variant="h3"
                                        >
                                            {plantao.nota.toFixed(1)}
                                        </Typography>
                                        <Typography color="textPrimary"
                                            variant="body1"
                                        >
                                            /5
                                        </Typography>
                                    </div>
                                    <StarRating value={plantao.nota} readonly size='large'/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.cardInfo}>
                            <div className={classes.sumarioPlantao}
                                style={{ marginBottom: 0 }}
                            >
                                <Typography color="textPrimary"
                                    variant="h6"
                                >
                                    Análise salarial
                                </Typography>
                            </div>
                            <div className={classes.grafico}>
                                <Line
                                    data={dados.salarioMes.data}
                                    options={dados.salarioMes.options}
                                    width={230}
                                    height={130}
                                />
                            </div>
                            <div className={classes.grafico}>
                                <Bar
                                    data={dados.salarioDiaSemana.data}
                                    options={dados.salarioDiaSemana.options}
                                    width={230}
                                    height={150}
                                />
                            </div>
                            <div className={classes.notaAvaliacao}>
                                <Typography color="textPrimary"
                                    variant="body1" gutterBottom
                                >
                                    Média salarial:
                                </Typography>
                                <div className={classes.rodapeAvaliacao}>
                                    <div className={classes.rodapeAvaliacao}>
                                        <Typography color="textPrimary"
                                            variant="h3"
                                        >
                                            R$ {plantao.media_salarial.toFixed(2).replace('.', ',')}
                                        </Typography>
                                        <Typography color="textPrimary"
                                            variant="body1"
                                        >
                                            /12H
                                        </Typography>
                                    </div>
                                </div>
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
                {informacoes && (
                    <div className={classes.closeButtonContainer}>
                        <IconButton aria-label="fechar"
                            className={classes.closeButton}
                            onClick={onClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                )}
                <ModalAvaliacaoPlantao
                    open={modalAvaliacaoPlantaoAberto}
                    subcategoria={subcategoriaPlantao}
                    idPlantao={plantao.idPlantao}
                    idHospital={informacoes?.idHospital}
                    nomeHospital={plantao.nome}
                    onClose={() => setModalAvaliacaoPlantaoAberto(false)}
                />
            </div>
        </Dialog>
    );
}

export default ModalInfoPlantao;

function getMonthsArray () {
    const n = new Date().getMonth();
    const months = [
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
    ];

    return [...months.slice(n + 1), ...months.slice(0, n + 1)];
}
