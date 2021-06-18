import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../services/api';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import CampoDocumentoIcon from '../../assets/images/icones/campoDocumento.svg';
import './styles.css';
import Button from '../Button';

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
            grauDeFormacao: number,
            uf: number,
            municipio: number,
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
            grauDeFormacao?: string,
            uf?: string,
            municipio?: string,
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
            grauDeFormacao?: boolean,
            uf?: boolean,
            municipio?: boolean,
            instituicaoDeEnsino?: boolean,
            dataDeNascimento?: boolean
        },
        arquivo?: boolean
    },
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur: (e: React.FocusEvent<unknown>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetCidade?: (reset: boolean) => void;
    setFotoDocumento?: (url: string) => void;
    setArquivoDocumento?: (arquivo: File) => void;
}

function FormCadastro (props: FormCadastroProps) {
    const [uf, setUF] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [grauDeFormacao, setGrauDeFormacao] = useState('');
    const [statusList, setStatusList] = useState([{ id: 0, nome: '' }]);
    const [estados, setEstados] = useState([{ id: 0, nome: '' }]);
    const [cidades, setCidades] = useState([{ id: 0, nome: '' }]);
    const [fotoDocumento, setFotoDocumento] = useState<string>();
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(() => {
        setErro(!!props.mensagemErro ||
            (!!props.errors.usuario?.nome && !!props.touched.usuario?.nome) ||
            (!!props.errors.usuario?.sobrenome && !!props.touched.usuario?.sobrenome) ||
            (!!props.errors.usuario?.email && !!props.touched.usuario?.email) ||
            (!!props.errors.usuario?.senha && !!props.touched.usuario?.senha) ||
            (!!props.errors.informacoesUsuario?.crm && !!props.touched.informacoesUsuario?.crm) ||
            (!!props.errors.informacoesUsuario?.uf && !!props.touched.informacoesUsuario?.uf) ||
            (!!props.errors.informacoesUsuario?.grauDeFormacao && !!props.touched.informacoesUsuario?.grauDeFormacao) ||
            (!!props.errors.informacoesUsuario?.municipio && !!props.touched.informacoesUsuario?.municipio) ||
            (!!props.errors.informacoesUsuario?.instituicaoDeEnsino && !!props.touched.informacoesUsuario?.instituicaoDeEnsino) ||
            (!!props.errors.informacoesUsuario?.dataDeNascimento && !!props.touched.informacoesUsuario?.dataDeNascimento) ||
            (!!props.errors.arquivo && !!props.touched.arquivo));
        setMensagemErro(props.mensagemErro ||
            (props.touched.usuario?.nome && props.errors.usuario?.nome) ||
            (props.touched.usuario?.sobrenome && props.errors.usuario?.sobrenome) ||
            (props.touched.usuario?.email && props.errors.usuario?.email) ||
            (props.touched.usuario?.senha && props.errors.usuario?.senha) ||
            (props.touched.informacoesUsuario?.crm && props.errors.informacoesUsuario?.crm) ||
            (props.touched.informacoesUsuario?.uf && props.errors.informacoesUsuario?.uf) ||
            (props.touched.informacoesUsuario?.grauDeFormacao && props.errors.informacoesUsuario?.grauDeFormacao) ||
            (props.touched.informacoesUsuario?.municipio && props.errors.informacoesUsuario?.municipio) ||
            (props.touched.informacoesUsuario?.instituicaoDeEnsino && props.errors.informacoesUsuario?.instituicaoDeEnsino) ||
            (props.touched.informacoesUsuario?.dataDeNascimento && props.errors.informacoesUsuario?.dataDeNascimento) ||
            (props.touched.arquivo && props.errors.arquivo) || '');
    }, [props.mensagemErro, props.errors, props.touched]);

    async function listarEstados () {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarGrauDeFormacao () {
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
    }, [props.etapa === 1]);

    async function listarCidades () {
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${props.values.informacoesUsuario.uf}/municipios?orderBy=nome`);
            setCidades(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
    }, [props.values.informacoesUsuario.uf, props.etapa === 1]);

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setFotoDocumento(URL.createObjectURL(img));
            props.setFotoDocumento && props.setFotoDocumento(URL.createObjectURL(img));
            props.setArquivoDocumento && props.setArquivoDocumento(img);
        }
    };

    return (
        <div className="modal-cadastro">
            <form onSubmit={props.handleSubmit}>
                <div className="titulo">
                    <h1>{props.mensagemErro || props.titulo}</h1>
                </div>
                <div className="subtitulo" style={erro ? { color: 'var(--cor-vermelha-warning)' } : { color: 'var(--cor-texto-claro)' }}>
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
                            <Button
                                background='#A1E09E'
                                type="submit"
                                texto={props.textoBotao}
                                tamanhoTexto="big"
                            />
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
                                    name="informacoesUsuario.uf"
                                    default="Estado"
                                    value={uf}
                                    error={!!props.errors.informacoesUsuario?.uf && !!props.touched.informacoesUsuario?.uf}
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
                            </div>
                            <div className="linha dupla">
                                <SelectInput
                                    name="informacoesUsuario.grauDeFormacao"
                                    value={grauDeFormacao}
                                    error={!!props.errors.informacoesUsuario?.grauDeFormacao && !!props.touched.informacoesUsuario?.grauDeFormacao}
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
                                <SelectInput
                                    name="informacoesUsuario.municipio"
                                    value={municipio}
                                    error={!!props.errors.informacoesUsuario?.municipio && !!props.touched.informacoesUsuario?.municipio}
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
                            <Button
                                background='#7BB2ED'
                                type="submit"
                                texto={props.textoBotao}
                                tamanhoTexto="big"
                            />
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
                            <Button
                                background='#FCE37F'
                                type="submit"
                                texto={props.textoBotao}
                                tamanhoTexto="big"
                            />
                        </>
                    )}
                    {props.etapa === 5 && (
                        <>
                            <div className="termos">
                                <p>{props.termos}</p>
                            </div>
                            <Button
                                background='#FF817C'
                                type="submit"
                                texto={props.textoBotao}
                                tamanhoTexto="big"
                            />
                        </>
                    )}
                </div>

            </form>
        </div>
    );
}

export default FormCadastro;
