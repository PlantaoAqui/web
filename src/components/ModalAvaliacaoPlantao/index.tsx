import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ReviewInput from '../ReviewInput';
import TextInput from '../TextInput';
import TextAreaInput from '../TextAreaInput';
import Button from '../Button';
import SelectInput from '../SelectInput';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import api from '../../services/api';
import AsyncAutocomplete from '../AsyncAutocomplete';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface ModalAvaliacaoPlantaoProps {
    open: boolean;
    subcategoria?: number;
    idPlantao?: number;
    idHospital?: number;
    nomeHospital?: string;
    onClose: () => void;
}

type itemSelect = {
    id: number;
    nome: string;
};

type groupSelect = {
    id: number;
    nome: string;
    subcategorias: Array<itemSelect>;
};

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            background: theme.palette.background.paper,
            borderRadius: theme.spacing(2),
            padding: theme.spacing(3),
            position: 'relative'
        },
        titulo: {
            fontWeight: 500,
            marginBottom: theme.spacing(6)
        },
        plantao: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: theme.spacing(3),
            marginBottom: theme.spacing(3)
        },
        colunaCampos: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: theme.spacing(2)
        },
        tituloColunaCampos: {
            marginBottom: '-0.6rem',
            fontWeight: 500
        },
        textoColuna: {
            padding: theme.spacing(2)
        },
        observacoes: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: theme.spacing(2),
            marginBottom: theme.spacing(3)
        },
        avaliacoes: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: theme.spacing(2),
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(2),
            padding: theme.spacing(2)
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

function ModalAvaliacaoPlantao (props: ModalAvaliacaoPlantaoProps) {
    const classes = useStyles();
    const didMount = useRef(false);
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            id_hospital: props.idHospital || 0,
            id_subcategoria: props.subcategoria || 0,
            avaliacao: {
                valor_recebido: 0,
                id_horas: 0,
                data_registrado: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0],
                data_realizado: 0
            },
            avaliacaoFixa: {
                infraestrutura: 0,
                equipamento: 0,
                equipe: 0,
                pagamento: 0,
                seguranca: 0,
                atrasado: false,
                comentario: ''
            }
        },
        validationSchema: Yup.object({
            id_hospital: Yup.number().positive().required(),
            id_subcategoria: Yup.number().positive().required(),
            avaliacao: Yup.object({
                valor_recebido: Yup.number().positive().required(),
                id_horas: Yup.number().positive().required(),
                data_registrado: Yup.date().required(),
                data_realizado: Yup.date().required()
            }),
            avaliacaoFixa: Yup.object({
                infraestrutura: Yup.number().min(0).max(5).integer().required(),
                equipamento: Yup.number().min(0).max(5).integer().required(),
                equipe: Yup.number().min(0).max(5).integer().required(),
                pagamento: Yup.number().min(0).max(5).integer().required(),
                seguranca: Yup.number().min(0).max(5).integer().required(),
                atrasado: Yup.boolean().required(),
                comentario: Yup.string().optional()
            })
        }),
        onSubmit: async () => {
            await api.post('/avaliacoes', formik.values)
                .then(() => {
                    enqueueSnackbar('Plantão registrado com sucesso',
                        { variant: 'success' });
                    props.onClose();
                })
                .catch((error) => {
                    enqueueSnackbar('Ocorreu um erro ao registrar o palntão',
                        { variant: 'error' });
                    console.log(error);
                });
        }
    });

    const [jaAvaliado, setJaAvaliado] = useState(false);
    const [tipo, setTipo] = useState('');
    const [dataPlantao, setDataPlantao] = useState('');
    const [estado, setEstado] = useState('');
    const [remuneracao, setRemuneracao] = useState('');
    const [cidade, setCidade] = useState('');
    const [tempoPlantao, setTempoPlantao] = useState('');
    const [instituicao, setInstituicao] = useState<itemSelect | null>(null);

    const [estados, setEstados] = useState<itemSelect[] | null>(null);
    const [cidades, setCidades] = useState<itemSelect[] | null>(null);
    const [tiposPlantao, setTiposPlantao] = useState<groupSelect[] | null>(null);
    const [horasPlantao, setHorasPlantao] = useState([{ id: 0, horas: '' }]);

    async function listarEstados () {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarTiposPlantao () {
        try {
            await api.get('/tipos', {
                params: { tipo: 'plantao' }
            })
                .then(response => {
                    setTiposPlantao(response.data);
                    const sub = (response.data as groupSelect[]).find(group =>
                        group.subcategorias.find(sub =>
                            sub.id === props.subcategoria
                        )
                    )?.subcategorias.find(sub =>
                        sub.id === props.subcategoria
                    );
                    sub && setTipo(sub.nome);
                });
        } catch (error) {
            console.log(error);
        }
    }

    async function listarHorasPlantao () {
        try {
            await api.get('/tipos', {
                params: { tipo: 'horas' }
            })
                .then(response => setHorasPlantao(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    async function listarInstituicoes (like: string) {
        try {
            const response = await api.get('/hospitais', {
                params: {
                    like,
                    uf: estados?.find(uf => uf.nome === estado)?.id,
                    municipio: cidades?.find(municipio =>
                        municipio.nome === cidade)?.id
                }
            });

            if (like === '' && props.nomeHospital) {
                response.data.unshift({ id: props.idHospital, nome: props.nomeHospital });
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function obterLocalidade () {
        try {
            const { data } = await api.get('/usuarios', { params: { filtro: 'localidade' } });
            setEstado(data.uf.nomeUF);
            setCidades([{
                id: data.municipio.idMunicipio,
                nome: data.municipio.nomeMunicipio
            }]);
            setCidade(data.municipio.nomeMunicipio);
        } catch (error) {
            console.log(error);
        }
    }

    async function obterAvaliacao () {
        try {
            const response = await api.get('/avaliacoes', {
                params: {
                    id_avaliacao: props.idPlantao,
                    id_subcategoria: props.subcategoria
                }
            });
            formik.setValues({
                ...formik.values,
                avaliacaoFixa: {
                    ...response.data,
                    atrasado: Boolean(response.data.atrasado)
                }
            });
            setJaAvaliado(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados().then(obterLocalidade);
        listarTiposPlantao();
        listarHorasPlantao();
        props.nomeHospital && setInstituicao({ id: 0, nome: props.nomeHospital });
        props.idPlantao && props.subcategoria && obterAvaliacao();
    }, []);

    async function listarCidades () {
        const idEstado = estados?.find(estadoSelecionado => estadoSelecionado.nome === estado)?.id;

        try {
            if (!idEstado) return;
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios?orderBy=nome`);
            response.data.length > 0 && setCidades(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
    }, [estado]);

    useEffect(() => {
        didMount.current
            ? (
                document.getElementById('root')?.style.setProperty(
                    'filter',
                    props.open ? 'blur(3px)' : 'blur(0px)')
            )
            : (
                didMount.current = true
            );
    }, [props.open]);

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    maxWidth: '720px',
                    minWidth: '500px',
                    width: '45vw',
                    outline: '0',
                    overflow: 'unset'
                }
            }}
        >
            <div className={classes.root}>
                <Typography color="textPrimary" variant="h4"
                    className={classes.titulo}
                >
                    {jaAvaliado ? 'Inserir Novo Plantão' : 'Inserir Nova Avalição'}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <div className={classes.plantao}>
                        <div className={classes.colunaCampos}>
                            <Typography color="textPrimary" variant="subtitle1"
                                className={classes.tituloColunaCampos}
                            >
                                Instituição avaliada
                            </Typography>
                            <SelectInput
                                value={estado}
                                default="Estado"
                                handleChange={(e) => {
                                    setEstado(e.target.value);
                                    setCidade('');
                                }}
                                items={estados}
                                keyMap={item => item.id}
                                valueMap={item => item.nome}
                            />
                            <SelectInput
                                name="cidade"
                                value={cidade}
                                default="Cidade"
                                handleChange={(e) => {
                                    setCidade(e.target.value);
                                }}
                                items={cidades}
                                keyMap={item => item.id}
                                valueMap={item => item.nome}
                            />
                            <AsyncAutocomplete
                                getOptions={listarInstituicoes}
                                value={instituicao}
                                onChange={(_event, newValue) => {
                                    if (newValue) {
                                        setInstituicao(newValue);
                                        formik.setValues({ ...formik.values, id_hospital: newValue.id });
                                    }
                                }}
                                getOptionLabel={(option) => option?.nome || ''}
                                getOptionSelected={(option, value) => option?.nome === value?.nome}
                                placeholder="Instituição"
                            />
                            <Typography color="textSecondary"
                                variant="caption" className={classes.textoColuna}
                            >
                                A instituição que você trabalhou ainda não esta cadastrada no sistema? <a href="#">clique aqui.</a>
                            </Typography>
                        </div>
                        <div className={classes.colunaCampos}>
                            <Typography color="textPrimary" variant="subtitle1"
                                className={classes.tituloColunaCampos}
                            >
                                Meu Plantão
                            </Typography>
                            <SelectInput
                                name="id_subcategoria"
                                value={tipo}
                                group
                                default="Tipo de Plantão"
                                handleChange={(e) => {
                                    setTipo(e.target.value);
                                    e.target.value = tiposPlantao?.find(group =>
                                        group.subcategorias.find(sub =>
                                            sub.nome === e.target.value
                                        )
                                    )?.subcategorias.find(sub =>
                                        sub.nome === e.target.value
                                    )?.id.toString() || '';
                                    formik.handleChange(e);
                                }}
                                items={tiposPlantao}
                                keyMap={item => item.id}
                                valueMap={item => item.nome}
                                elementsGroupMap={item => item.subcategorias.map(sub => {
                                    return ({ id: sub.id, value: sub.nome });
                                })}
                            />
                            <TextInput
                                name="avaliacao.data_realizado"
                                value={dataPlantao}
                                handleChange={(e) => {
                                    setDataPlantao(e.target.value);
                                    formik.handleChange(e);
                                }}
                                placeholder="Data do Plantão"
                                data
                            />
                            <CurrencyInput
                                placeholder="Remuneração"
                                decimalScale={2}
                                prefix="R$"
                                style={{
                                    border: '1px solid var(--cor-borda-campos)'
                                }}
                                value={remuneracao}
                                onValueChange={(value) => {
                                    setRemuneracao(value || '');
                                    formik.setValues({
                                        ...formik.values,
                                        avaliacao: {
                                            ...formik.values.avaliacao,
                                            valor_recebido: parseFloat(value?.replace('R$', '').replace('.', '').replace(',', '.') || '0')
                                        }
                                    });
                                }}
                            />
                            <SelectInput
                                name="avaliacao.id_horas"
                                value={tempoPlantao}
                                default="Tempo de Plantão"
                                handleChange={(e) => {
                                    setTempoPlantao(e.target.value);
                                    e.target.value = horasPlantao?.find(plantao => plantao.horas === e.target.value)?.id.toString() || '';
                                    formik.handleChange(e);
                                }}
                                items={horasPlantao}
                                keyMap={item => item.id}
                                valueMap={item => item.horas}
                            />
                        </div>
                    </div>
                    <div className={classes.observacoes}>
                        <Typography color="textPrimary" variant="subtitle1"
                            className={classes.tituloColunaCampos}
                        >
                            Observações pessoais
                        </Typography>
                        <TextAreaInput
                            descricao="250 caracteres"
                            name="avaliacaoFixa.comentario"
                            onChange={formik.handleChange}
                            value={formik.values.avaliacaoFixa.comentario}
                        />
                    </div>
                    <div className={classes.observacoes}>
                        <Typography color="textPrimary" variant="subtitle1"
                            className={classes.tituloColunaCampos}
                        >
                            Avaliação
                        </Typography>
                        <div className={classes.avaliacoes}>
                            <ReviewInput
                                name="avaliacaoFixa.infraestrutura"
                                titulo="Infraestrutura"
                                descricao="Salas, consultórios, conforto médico, UTI, centro cirurgico, etc."
                                nota={formik.values.avaliacaoFixa.infraestrutura}
                                handleChange={formik.handleChange}

                            />
                            <ReviewInput
                                name="avaliacaoFixa.equipamento"
                                titulo="Equipamentos"
                                descricao="Insumos, materiais, maquinas em funcionamento, usg, etc."
                                nota={formik.values.avaliacaoFixa.equipamento}
                                handleChange={formik.handleChange}
                            />
                            <ReviewInput
                                name="avaliacaoFixa.equipe"
                                titulo="Equipe de Saúde"
                                descricao="Responsabilidade, empatia, organização, capacidade técnica."
                                nota={formik.values.avaliacaoFixa.equipe}
                                handleChange={formik.handleChange}
                            />
                            <ReviewInput
                                name="avaliacaoFixa.seguranca"
                                titulo="Segurança do Médico"
                                descricao="Sobrecarga de pacientes, exposição a riscos e complicações."
                                nota={formik.values.avaliacaoFixa.seguranca}
                                handleChange={formik.handleChange}
                            />
                            <ReviewInput
                                name="avaliacaoFixa.pagamento"
                                titulo="Pagamento"
                                descricao="Considera o valor justo pelo trabalho executado?"
                                nota={formik.values.avaliacaoFixa.pagamento}
                                handleChange={formik.handleChange}
                                pergunta
                                textoPergunta="Pagamento dentro do prazo?"
                                valorPergunta={!formik.values.avaliacaoFixa.atrasado}
                                handleChangePergunta={(_, value) => {
                                    formik.setValues({
                                        ...formik.values,
                                        avaliacaoFixa: {
                                            ...formik.values.avaliacaoFixa,
                                            atrasado: value !== 'true'
                                        }
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <Button
                        background="#7BB2ED"
                        texto={jaAvaliado ? 'Submeter plantão' : 'Submeter avaliação'}
                        type="submit"
                    />
                </form>
                <div className={classes.closeButtonContainer}>
                    <IconButton aria-label="fechar"
                        className={classes.closeButton}
                        onClick={props.onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>
        </Dialog>
    );
}

export default ModalAvaliacaoPlantao;
