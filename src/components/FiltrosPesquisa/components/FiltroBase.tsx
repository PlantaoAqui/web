import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SelectInputSlim from '../../SelectInputSlim';
import axios from 'axios';
import StarRating from '../../StarRating';
import Slider from '@material-ui/core/Slider';
import api from '../../../services/api';
import useSearch from '../../../hooks/use-search';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            padding: '0.7rem 1.3rem',
            background: 'var(--cor-fundo-card)',
            borderRadius: '8px',
            marginBottom: '1.3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'stretch'
        },
        selectBox: {
            marginBottom: '1rem'
        },
        avaliacao: {
            marginTop: '-.4rem',
            borderTop: '1px solid #B7B8BA',
            borderBottom: '1px solid #B7B8BA',
            padding: '.7rem 0'
        },
        remuneracao: {
            padding: '.7rem 0'
        },
        faixaPreco: {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            width: '100%'
        }
    })
);

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),' +
    '0 4px 8px rgba(0,0,0,0.13),' +
    '0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
    root: {
        color: '#7BB2ED',
        height: 2,
        padding: '15px 0'
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        marginTop: -8,
        marginLeft: -8,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow
            }
        }
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000'
        }
    },
    track: {
        height: 2
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf'
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor'
    }
})(Slider);

const ordenarPorValues: string[] = [
    'Mais relevantes',
    'Nota de avaliação',
    'Remuneração'
];

type selectItem = {
    id: number;
    nome: string;
};

function FiltroBase() {
    const classes = useStyles();
    const search = useSearch();
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [estados, setEstados] = useState<selectItem[] | null>(null);
    const [cidades, setCidades] = useState<selectItem[] | null>(null);

    async function listarEstados() {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function obterLocalidade() {
        try {
            const { data } = await api.get('/usuarios', { params: { filtro: 'localidade' } });
            setEstado(data.uf.nomeUF);
            search.setDados.setUF(data.uf.idUF);
            setCidades([{ id: data.municipio.idMunicipio, nome: data.municipio.nomeMunicipio }]);
            setCidade(data.municipio.nomeMunicipio);
            search.setDados.setMunicipio(data.municipio.idMunicipio);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados()
            .then(() => obterLocalidade());
    }, []);

    async function listarCidades() {
        const idEstado = estados?.find(uf => uf.nome === estado)?.id;

        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios?orderBy=nome`);
            setCidades(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
    }, [estado, estados]);

    return (
        <div className={classes.root}>
            <div className={classes.selectBox}>
                <Typography color="textPrimary" variant="body1">
                    Ordenar por
                </Typography>
                <SelectInputSlim
                    value={ordenarPorValues[search.dados.ordenarPor]}
                    handleChange={(e) => {
                        const value = (e.target as HTMLSelectElement).value;
                        const index = ordenarPorValues.indexOf(value);
                        search.setDados.setOrdenarPor(index);
                    }}
                    fullwidth
                    items={ordenarPorValues}
                    keyMap={(item) => item}
                    valueMap={(item) => item}
                />
            </div>
            <div className={classes.selectBox}>
                <Typography color="textPrimary" variant="body1">
                    Estado
                </Typography>
                <SelectInputSlim
                    value={estado}
                    placeholder='Estados'
                    fullwidth
                    handleChange={(e) => {
                        const estado = (e.target as HTMLSelectElement).value;
                        setEstado(estado);
                        setCidade('');
                        const uf = estados?.find(uf => uf.nome === estado)?.id;
                        uf && search.setDados.setUF(uf);
                    }}
                    items={estados}
                    keyMap={(estado) => estado.id}
                    valueMap={(estado) => estado.nome}
                />
            </div>
            <div className={classes.selectBox}>
                <Typography color="textPrimary" variant="body1">
                    Cidade
                </Typography>
                <SelectInputSlim
                    value={cidade}
                    placeholder='Cidades'
                    fullwidth
                    handleChange={(e) => {
                        const cidade = (e.target as HTMLSelectElement).value;
                        setCidade(cidade);
                        const municipio = cidades?.find(municipio => municipio.nome === cidade)?.id;
                        municipio && search.setDados.setMunicipio(municipio);
                    }}
                    items={cidades}
                    keyMap={(cidade) => cidade.id}
                    valueMap={(cidade) => cidade.nome}
                />
            </div>
            <div className={classes.avaliacao}>
                <Typography color="textPrimary" variant="body1" gutterBottom>
                    Nota da instituição
                </Typography>
                <StarRating
                    name="nota"
                    value={search.dados.nota}
                    handleChange={(_, value) => search.setDados.setNota(value || 0)}
                    precision={1} size="large"
                />
            </div>
            <div className={classes.remuneracao}>
                <Typography color="textPrimary" variant="body1" gutterBottom>
                    Remuneração/ Hora
                </Typography>
                <IOSSlider
                    value={search.dados.intervaloRemuneracao}
                    onChange={(_, value) => search.setDados.setIntervaloRemuneracao(value as number[])}
                    valueLabelDisplay="off" max={3000}
                />
                <div className={classes.faixaPreco}>
                    <Typography color="textSecondary" variant="body1">
                        R$ {search.dados.intervaloRemuneracao[0]}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        R$ {search.dados.intervaloRemuneracao[1]}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default FiltroBase;
