import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles.css';

interface FormCadastroProps {
    titulo: string;
    subtitulo?: string;
    etapa: number;
    termos?: string;
    textoDocumento?: string;
    placeholderDocumento?: string;
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
            status: string,
            estado: string,
            cidade: string,
            instituicaoDeEnsino: string,
            dataDeNascimento: string
        },
        arquivo: string
    },
    handleChange: (e: React.ChangeEvent<any>) => void;
    proximaEtapa: (e: React.ChangeEvent<HTMLFormElement>) => void;
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
    const classes = useStyles();
    const [estados, setEstados] = useState([{id: 0, nome: ''}]);
    const [cidades, setCidades] = useState([{id: 0, nome: ''}]);
    const [fotoDocumento, setFotoDocumento] = useState<string>();

    async function listarEstados() {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados();
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
            <form onSubmit={props.proximaEtapa}>
                <div className="titulo">
                    <h1>{props.titulo}</h1>
                </div>
                {props.subtitulo && (
                    <div className="subtitulo">
                        <h3>{props.subtitulo}</h3>
                    </div>
                )}
                <div className="conteudo">
                    {props.etapa === 0 && (
                        <>
                            <div className="nome">
                                <input
                                    type="text"
                                    name="usuario.nome"
                                    placeholder="Nome"
                                    value={props.values.usuario.nome}
                                    onChange={props.handleChange}
                                />
                                <input
                                    type="text"
                                    name="usuario.sobrenome"
                                    placeholder="Sobrenome"
                                    value={props.values.usuario.sobrenome}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <input
                                type="email"
                                name="usuario.email"
                                placeholder="nome@exemplo.com"
                                value={props.values.usuario.email}
                                onChange={props.handleChange}
                            />
                            <input
                                type="password"
                                name="usuario.senha"
                                placeholder="Senha"
                                value={props.values.usuario.senha}
                                onChange={props.handleChange}
                            />
                            <p className="rodape">{props.rodape}</p>
                            <button style={{background: "#CFEACA"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                    {props.etapa === 1 && (
                        <>
                            <div className="linha">
                                <div className="campo">
                                    <input
                                        type="text"
                                        name="informacoesUsuario.crm"
                                        placeholder="CRM"
                                        value={props.values.informacoesUsuario.crm}
                                        onChange={props.handleChange}
                                    />
                                </div>
                                <div className="campo">
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <Select
                                            className={classes.root}
                                            displayEmpty
                                            name="informacoesUsuario.estado"
                                            value={props.values.informacoesUsuario.estado}
                                            onChange={(e) => {
                                                props.handleChange(e);
                                                props.resetCidade && props.resetCidade(true);
                                            }}
                                        >
                                            <MenuItem disabled value=""><em>Estado</em></MenuItem>
                                            {estados.map(estado => {
                                                return(
                                                    <MenuItem
                                                        key={estado.id} value={estado.nome}
                                                    >
                                                        {estado.nome}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="linha">
                                <div className="campo">
                                    <input
                                        type="text"
                                        name="informacoesUsuario.status"
                                        placeholder="Status"
                                        value={props.values.informacoesUsuario.status}
                                        onChange={props.handleChange}
                                    />
                                </div>
                                <div className="campo">
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <Select
                                            className={classes.root}
                                            displayEmpty
                                            name="informacoesUsuario.cidade"
                                            value={props.values.informacoesUsuario.cidade}
                                            onChange={props.handleChange}
                                        >
                                            <MenuItem disabled value=""><em>Cidade</em></MenuItem>
                                            {cidades.map(cidade => {
                                                return(
                                                    <MenuItem
                                                        key={cidade.id} value={cidade.nome}
                                                    >
                                                        {cidade.nome}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>

                                </div>
                            </div>
                            <div className="linha">
                                <input
                                    type="text"
                                    name="informacoesUsuario.instituicaoDeEnsino"
                                    placeholder="Instituição de ensino"
                                    value={props.values.informacoesUsuario.instituicaoDeEnsino}
                                    onChange={props.handleChange}
                                />
                                <input
                                    type="text" onFocus={(e) => e.target.type='date'}
                                    name="informacoesUsuario.dataDeNascimento"
                                    placeholder="Data de nascimento"
                                    value={props.values.informacoesUsuario.dataDeNascimento}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <button style={{background: "#C7E2EB"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                    {props.etapa === 2 && (
                        <>
                            <div className="termos">
                                <p>{props.termos}</p>
                            </div>
                            <button style={{background: "#EFD8D8"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                    {props.etapa === 3 && (
                        <>
                            <div className="confirmacao-documento">
                                <div className="descricao">
                                    <p>{props.textoDocumento}</p>
                                </div>
                                <div className="arquivo">
                                    {fotoDocumento && <img src={fotoDocumento} alt="Foto do seu documento"/>}
                                    <label htmlFor="selecionar-foto">
                                        <p>{props.placeholderDocumento}</p>
                                    </label>
                                </div>
                                <input
                                    id="selecionar-foto"
                                    type="file"
                                    onChange={handleChangePhoto}
                                />
                            </div>
                            <button style={{background: "#EDDCC1"}} type="submit">{props.textoBotao}</button>
                        </>
                    )}
                </div>

            </form>
        </div>
    );
}

export default FormCadastro;
