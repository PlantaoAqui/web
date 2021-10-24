import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '../../../components/Button';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import axios from 'axios';
import api from '../../../services/api';

interface FormInfoProps {
    values: {
        crm: string,
        grauDeFormacao: number,
        uf: number,
        municipio: number,
        instituicaoDeEnsino: string,
        dataDeNascimento: string
    },
    errors?: {
        crm?: string,
        grauDeFormacao?: string,
        uf?: string,
        municipio?: string,
        instituicaoDeEnsino?: string,
        dataDeNascimento?: string
    },
    touched?: {
        crm?: boolean,
        grauDeFormacao?: boolean,
        uf?: boolean,
        municipio?: boolean,
        instituicaoDeEnsino?: boolean,
        dataDeNascimento?: boolean
    },
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur: (e: React.FocusEvent<unknown>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetCidade?: (reset: boolean) => void;
    setFotoDocumento?: (url: string) => void;
    setArquivoDocumento?: (arquivo: File) => void;
}

const useStyles = makeStyles(theme =>
    createStyles({
        campos: {
            marginTop: '2rem'
        },
        erroInscricao: {
            color: theme.palette.error.main
        }
    })
);

function FormInfo(props: FormInfoProps) {
    const classes = useStyles();
    const [temErro, setTemErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [uf, setUF] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [grauDeFormacao, setGrauDeFormacao] = useState('');
    const [statusList, setStatusList] = useState([{ id: 0, nome: '' }]);
    const [estados, setEstados] = useState([{ id: 0, nome: '' }]);
    const [cidades, setCidades] = useState([{ id: 0, nome: '' }]);

    useEffect(() => {
        setTemErro(
            (!!props.errors?.crm && !!props.touched?.crm) ||
            (!!props.errors?.grauDeFormacao && !!props.touched?.grauDeFormacao) ||
            (!!props.errors?.instituicaoDeEnsino && !!props.touched?.instituicaoDeEnsino) ||
            (!!props.errors?.uf && !!props.touched?.uf) ||
            (!!props.errors?.municipio && !!props.touched?.municipio) ||
            (!!props.errors?.dataDeNascimento && !!props.touched?.dataDeNascimento));
        setMensagemErro(
            (props.touched?.crm && props.errors?.crm) ||
            (props.touched?.grauDeFormacao && props.errors?.grauDeFormacao) ||
            (props.touched?.instituicaoDeEnsino && props.errors?.instituicaoDeEnsino) ||
            (props.touched?.uf && props.errors?.uf) ||
            (props.touched?.municipio && props.errors?.municipio) ||
            (props.touched?.dataDeNascimento && props.errors?.dataDeNascimento) || '');
    }, [props.errors, props.touched]);

    async function listarEstados() {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarGrauDeFormacao() {
        try {
            const response = await api.get('/tipos', {
                params: { tipo: 'formacao' }
            });
            setStatusList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados();
        listarGrauDeFormacao();
    }, []);

    async function listarCidades() {
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${props.values.uf}/municipios?orderBy=nome`);
            setCidades(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
    }, [props.values.uf]);

    return (
        <>
            <Typography gutterBottom
                variant="h4" color="textPrimary"
            >
                Como somos uma comunidade de médicos, precisaremos de mais alguns dados...
            </Typography>
            <form className={classes.campos} onSubmit={props.handleSubmit}>
                {temErro && (
                    <Typography gutterBottom className={classes.erroInscricao}
                        variant="body1" color="textSecondary"
                    >
                        {mensagemErro}
                    </Typography>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextInput
                            type="text"
                            name="informacoesUsuario.crm"
                            placeholder="CRM"
                            value={props.values.crm}
                            error={!!props.errors?.crm && !!props.touched?.crm}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectInput
                            name="informacoesUsuario.uf"
                            default="Estado"
                            value={uf}
                            error={!!props.errors?.uf && !!props.touched?.uf}
                            handleChange={(e) => {
                                setUF(e.target.value);
                                e.target.value = estados.find(estado => estado.nome === e.target.value)?.id.toString() || '';
                                props.handleChange(e);
                                setMunicipio('');
                                props.resetCidade && props.resetCidade(true);
                            }}
                            handleBlur={props.handleBlur}
                            items={estados}
                            keyMap={estado => estado.id}
                            valueMap={estado => estado.nome}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectInput
                            name="informacoesUsuario.grauDeFormacao"
                            value={grauDeFormacao}
                            error={!!props.errors?.grauDeFormacao && !!props.touched?.grauDeFormacao}
                            default="Grau de formação"
                            handleChange={(e) => {
                                setGrauDeFormacao(e.target.value);
                                e.target.value = statusList?.find(stat => stat.nome === e.target.value)?.id.toString() || '';
                                props.handleChange(e);
                            }}
                            handleBlur={props.handleBlur}
                            items={statusList}
                            keyMap={status => status.id}
                            valueMap={status => status.nome}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectInput
                            name="informacoesUsuario.municipio"
                            value={municipio}
                            error={!!props.errors?.municipio && !!props.touched?.municipio}
                            default="Cidade"
                            handleChange={(e) => {
                                setMunicipio(e.target.value);
                                e.target.value = cidades.find(cidade => cidade.nome === e.target.value)?.id.toString() || '';
                                props.handleChange(e);
                            }}
                            handleBlur={props.handleBlur}
                            items={cidades}
                            keyMap={cidade => cidade.id}
                            valueMap={cidade => cidade.nome}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput
                            type="text"
                            name="informacoesUsuario.instituicaoDeEnsino"
                            placeholder="Instituição de ensino"
                            value={props.values.instituicaoDeEnsino}
                            error={!!props.errors?.instituicaoDeEnsino && !!props.touched?.instituicaoDeEnsino}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput
                            type="text"
                            data
                            name="informacoesUsuario.dataDeNascimento"
                            placeholder="Data de nascimento"
                            value={props.values.dataDeNascimento}
                            error={!!props.errors?.dataDeNascimento && !!props.touched?.dataDeNascimento}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                            gutterBottom
                        />
                    </Grid>
                </Grid>
                <Button
                    background='#7BB2ED'
                    type="submit"
                    texto="Prosseguir"
                    textTransform="none"
                />
            </form>
        </>
    );
}

export default FormInfo;
