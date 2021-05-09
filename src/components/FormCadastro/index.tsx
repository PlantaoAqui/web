import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import CampoDocumentoIcon from '../../assets/images/icones/campoDocumento.svg';
import './styles.css';

interface FormCadastroProps {
    titulo: string;
    subtitulo?: string;
    mensagemErro?: string;
    etapa: number;
    termos?: string;
    rodape?: string;
    textoBotao: string;
    values: {
        usuario: {
            nome: string,
            sobrenome: string,
            email: string,
            senha: string
        },
        informacoesUsuario: {
            crm: string,
            status: number,
            estado: string,
            cidade: string,
            instituicaoDeEnsino: string,
            dataDeNascimento: string
        },
        arquivo: string
    },
    errors: {
        usuario?: {
            nome?: string,
            sobrenome?: string,
            email?: string,
            senha?: string
        },
        informacoesUsuario?: {
            crm?: string,
            status?: string,
            estado?: string,
            cidade?: string,
            instituicaoDeEnsino?: string,
            dataDeNascimento?: string
        },
        arquivo?: string
    },
    touched: {
        usuario?: {
            nome?: boolean,
            sobrenome?: boolean,
            email?: boolean,
            senha?: boolean
        },
        informacoesUsuario?: {
            crm?: boolean,
            status?: boolean,
            estado?: boolean,
            cidade?: boolean,
            instituicaoDeEnsino?: boolean,
            dataDeNascimento?: boolean
        },
        arquivo?: boolean
    },
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetCidade?: (reset: boolean) => void;
    setFotoDocumento?: (url: string) => void;
    setArquivoDocumento?: (arquivo: File) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
        width: '100%'
    },
    root: {
        height: '4rem',
        color: "var(--cor-texto-claro)",
        background: 'transparent',
        border: '1px solid var(--cor-borda-campos)',
        borderRadius: '0.8rem',
        font: '400 1.7rem Roboto',
        padding: '0'
    }
  }),
);

function FormCadastro (props: FormCadastroProps) {
    const [status, setStatus] = useState('');
    const [statusList, setStatusList] = useState([{id: 0, nome: ''}]);
    const [estados, setEstados] = useState([{id: 0, nome: ''}]);
    const [cidades, setCidades] = useState([{id: 0, nome: ''}]);
    const [fotoDocumento, setFotoDocumento] = useState<string>();
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(() =>{
        setErro(!!props.mensagemErro ||
            (!!props.errors.usuario?.nome && !!props.touched.usuario?.nome) ||
            (!!props.errors.usuario?.sobrenome && !!props.touched.usuario?.sobrenome) ||
            (!!props.errors.usuario?.email && !!props.touched.usuario?.email) ||
            (!!props.errors.usuario?.senha && !!props.touched.usuario?.senha) ||
            (!!props.errors.informacoesUsuario?.crm && !!props.touched.informacoesUsuario?.crm) ||
            (!!props.errors.informacoesUsuario?.estado && !!props.touched.informacoesUsuario?.estado) ||
            (!!props.errors.informacoesUsuario?.status && !!props.touched.informacoesUsuario?.status) ||
            (!!props.errors.informacoesUsuario?.cidade && !!props.touched.informacoesUsuario?.cidade) ||
            (!!props.errors.informacoesUsuario?.instituicaoDeEnsino && !!props.touched.informacoesUsuario?.instituicaoDeEnsino) ||
            (!!props.errors.informacoesUsuario?.dataDeNascimento && !!props.touched.informacoesUsuario?.dataDeNascimento) ||
            (!!props.errors.arquivo && !!props.touched.arquivo));
        setMensagemErro(props.mensagemErro ||
            (props.touched.usuario?.nome && props.errors.usuario?.nome) ||
            (props.touched.usuario?.sobrenome && props.errors.usuario?.sobrenome) ||
            (props.touched.usuario?.email && props.errors.usuario?.email) ||
            (props.touched.usuario?.senha && props.errors.usuario?.senha) ||
            (props.touched.informacoesUsuario?.crm && props.errors.informacoesUsuario?.crm) ||
            (props.touched.informacoesUsuario?.estado && props.errors.informacoesUsuario?.estado) ||
            (props.touched.informacoesUsuario?.status && props.errors.informacoesUsuario?.status) ||
            (props.touched.informacoesUsuario?.cidade && props.errors.informacoesUsuario?.cidade) ||
            (props.touched.informacoesUsuario?.instituicaoDeEnsino && props.errors.informacoesUsuario?.instituicaoDeEnsino) ||
            (props.touched.informacoesUsuario?.dataDeNascimento && props.errors.informacoesUsuario?.dataDeNascimento) ||
            (props.touched.arquivo && props.errors.arquivo) || '');
    }, [props.mensagemErro, props.errors, props.touched]);

    async function listarEstados() {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarStatus() {
        try {
            const response = await api.get(`/tipos`, {
                params: { tipo: 'status' }
            })
            setStatusList(response.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEstados();
        listarStatus();
    }, [props.etapa === 1]);

    async function listarCidades() {
        const idEstado = estados.find(estado => estado.nome === props.values.informacoesUsuario.estado)?.id;
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios?orderBy=nome`);
            setCidades(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
    }, [props.values.informacoesUsuario.estado, props.etapa === 1]);

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setFotoDocumento(URL.createObjectURL(img));
            props.setFotoDocumento && props.setFotoDocumento(URL.createObjectURL(img));
            props.setArquivoDocumento && props.setArquivoDocumento(img);
        }
    }

    return (
        <div className="modal-cadastro">
            <form onSubmit={props.handleSubmit}>
                <div className="titulo">
                    <h1>{props.mensagemErro || props.titulo}</h1>
                </div>
                <div className="subtitulo" style={erro ? { color: "var(--cor-vermelha-warning)"} : {color: "var(--cor-texto-claro)"}}>
                    <h3>{mensagemErro || props.subtitulo}</h3>
                </div>
                <div className="conteudo">
                    {props.etapa === 0 && (
                        <>
                            <div className="linha dupla">
                                <TextInput
                                    type="text"
                                    name="usuario.nome"
                                    placeholder="Nome"
                                    value={props.values.usuario.nome}
                                    error={!!props.errors.usuario?.nome && !!props.touched.usuario?.nome}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                                <TextInput
                                    type="text"
                                    name="usuario.sobrenome"
                                    placeholder="Sobrenome"
                                    value={props.values.usuario.sobrenome}
                                    error={!!props.errors.usuario?.sobrenome && !!props.touched.usuario?.sobrenome}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                            </div>
                            <div className="linha">
                                <TextInput
                                    type="email"
                                    name="usuario.email"
                                    placeholder="nome@exemplo.com"
                                    value={props.values.usuario.email}
                                    error={!!props.errors.usuario?.email && !!props.touched.usuario?.email}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                            </div>
                            <div className="linha">
                                <TextInput
                                    type="password"
                                    name="usuario.senha"
                                    placeholder="Senha"
                                    value={props.values.usuario.senha}
                                    error={!!props.errors.usuario?.senha && !!props.touched.usuario?.senha}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                            </div>
                            <p className="rodape">{props.rodape}</p>
                            <button style={{background: "#A1E09E"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                    {props.etapa === 1 && (
                        <>
                            <div className="linha dupla">
                                <TextInput
                                    type="text"
                                    name="informacoesUsuario.crm"
                                    placeholder="CRM"
                                    value={props.values.informacoesUsuario.crm}
                                    error={!!props.errors.informacoesUsuario?.crm && !!props.touched.informacoesUsuario?.crm}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                                <SelectInput
                                    name="informacoesUsuario.estado"
                                    default="Estado"
                                    value={props.values.informacoesUsuario.estado}
                                    error={!!props.errors.informacoesUsuario?.estado && !!props.touched.informacoesUsuario?.estado}
                                    handleChange={(e) => {
                                        props.handleChange(e);
                                        props.resetCidade && props.resetCidade(true);
                                    }}
                                    handleBlur={props.handleBlur}
                                    items={estados}
                                    keyMap={estado => estado.id}
                                    valueMap={estado => estado.nome}
                                />
                            </div>
                            <div className="linha dupla">
                                <SelectInput
                                    name="informacoesUsuario.status"
                                    value={status}
                                    error={!!props.errors.informacoesUsuario?.status && !!props.touched.informacoesUsuario?.status}
                                    default="Status"
                                    handleChange={(e) => {
                                        setStatus(e.target.value);
                                        e.target.value = statusList?.find(stat => stat.nome === e.target.value)?.id;
                                        props.handleChange(e);
                                    }}
                                    handleBlur={props.handleBlur}
                                    items={statusList}
                                    keyMap={status => status.id}
                                    valueMap={status => status.nome}
                                />
                                <SelectInput
                                    name="informacoesUsuario.cidade"
                                    value={props.values.informacoesUsuario.cidade}
                                    error={!!props.errors.informacoesUsuario?.cidade && !!props.touched.informacoesUsuario?.cidade}
                                    default="Cidade"
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                    items={cidades}
                                    keyMap={cidade => cidade.id}
                                    valueMap={cidade => cidade.nome}
                                />
                            </div>
                            <div className="linha dupla">
                                <TextInput
                                    type="text"
                                    name="informacoesUsuario.instituicaoDeEnsino"
                                    placeholder="Instituição de ensino"
                                    value={props.values.informacoesUsuario.instituicaoDeEnsino}
                                    error={!!props.errors.informacoesUsuario?.instituicaoDeEnsino && !!props.touched.informacoesUsuario?.instituicaoDeEnsino}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                                <TextInput
                                    type="text"
                                    data
                                    name="informacoesUsuario.dataDeNascimento"
                                    placeholder="Data de nascimento"
                                    value={props.values.informacoesUsuario.dataDeNascimento}
                                    error={!!props.errors.informacoesUsuario?.dataDeNascimento && !!props.touched.informacoesUsuario?.dataDeNascimento}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                />
                            </div>
                            <button style={{background: "#7BB2ED"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                    {props.etapa === 2 && (
                        <>
                            <div className="confirmacao-documento">
                                <div className="descricao">
                                    <p>
                                        Obrigado por ter chegado até aqui e fazer parte da nossa comunidade!
                                        Porém ainda falta um ultimo passo para que possa usufruir 100% da
                                        nossa plataforma. <br/><br/> Precisamos que tire uma foto junto com o
                                        seu CRM, comprovando a sua identidade.
                                    </p>
                                </div>
                                <div className="arquivo">
                                    {fotoDocumento
                                        ? <img src={fotoDocumento} alt="Foto do seu documento"/>
                                        : <img src={CampoDocumentoIcon} alt="Insira o seu documento"/>}
                                    <label htmlFor="selecionar-foto">
                                        <p>Clique aqui <br/> ou arraste o seu arquivo</p>
                                    </label>
                                </div>
                                <input
                                    id="selecionar-foto"
                                    name="confirmacaoCadastro"
                                    type="file"
                                    accept="image/x-png,image/jpeg"
                                    onChange={handleChangePhoto}
                                />
                            </div>
                            <button style={{background: "#FCE37F"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                    {props.etapa === 5 && (
                        <>
                            <div className="termos">
                                <p>{props.termos}</p>
                            </div>
                            <button style={{background: "#FF817C"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                </div>

            </form>
        </div>
    );
}

export default FormCadastro;
