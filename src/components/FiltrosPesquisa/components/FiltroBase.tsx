import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SelectInputSlim from '../../SelectInputSlim';
import axios from 'axios';
import StarRating from '../../StarRating';
import Slider from '@material-ui/core/Slider';
import api from '../../../services/api';

interface FiltroBaseProps {
    estado: string;
    setEstado: (estado: string) => void;
    cidade: string;
    setCidade: (cidade: string) => void;

}

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

function FiltroBase (props: FiltroBaseProps) {
    const classes = useStyles();
    const [estados, setEstados] = useState([{ id: 0, nome: '' }]);
    const [cidades, setCidades] = useState([{ id: 0, nome: '' }]);
    const [nota, setNota] = useState(0);
    const [value, setValue] = useState<number[]>([300, 2500]);

    async function listarEstados () {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function obterLocalidade () {
        try {
            const { data } = await api.get('/usuarios', { params: { filtro: 'localidade' } });
            props.setEstado(data.estado);
            setCidades([{ id: 0, nome: data.cidade }]);
            props.setCidade(data.cidade);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados();
        obterLocalidade();
    }, []);

    async function listarCidades () {
        const idEstado = estados.find(estado => estado.nome === props.estado)?.id;

        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios?orderBy=nome`);
            setCidades(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
        console.log(props.estado);
    }, [props.estado]);

    return (
        <div className={classes.root}>
            <div className={classes.selectBox}>
                <Typography color="textPrimary" variant="h6">
                    Estado
                </Typography>
                <SelectInputSlim
                    value={props.estado}
                    placeholder='Estados'
                    fullwidth
                    handleChange={(e) => props.setEstado((e.target as HTMLSelectElement).value)}
                    items={estados}
                    keyMap={(estado) => estado.id}
                    valueMap={(estado) => estado.nome}
                />
            </div>
            <div className={classes.selectBox}>
                <Typography color="textPrimary" variant="h6">
                    Cidade
                </Typography>
                <SelectInputSlim
                    value={props.cidade}
                    placeholder='Cidades'
                    fullwidth
                    handleChange={(e) => props.setCidade((e.target as HTMLSelectElement).value)}
                    items={cidades}
                    keyMap={(cidade) => cidade.id}
                    valueMap={(cidade) => cidade.nome}
                />
            </div>
            <div className={classes.avaliacao}>
                <Typography color="textPrimary" variant="h6" gutterBottom>
                    Nota da instituição
                </Typography>
                <StarRating
                    name="nota"
                    value={nota}
                    handleChange={(_, value) => setNota(value || 0)}
                    precision={1} size="large"
                />
            </div>
            <IOSSlider
                value={value}
                onChange={(_, value) => setValue(value as number[])}
                valueLabelDisplay="off" max={3000}
            />
            <div className={classes.faixaPreco}>
                <Typography color="textSecondary" variant="h6">
                    R$ {value[0]}
                </Typography>
                <Typography color="textSecondary" variant="h6">
                    R$ {value[1]}
                </Typography>
            </div>
        </div>
    );
}

export default FiltroBase;
