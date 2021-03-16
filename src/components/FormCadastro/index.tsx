import React from 'react';
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
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    proximaEtapa: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

function FormCadastro (props: FormCadastroProps) {
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
                                <input
                                    type="text"
                                    name="informacoesUsuario.crm"
                                    placeholder="CRM"
                                    value={props.values.informacoesUsuario.crm}
                                    onChange={props.handleChange}
                                />
                                <input
                                    type="text"
                                    name="informacoesUsuario.estado"
                                    placeholder="Estado"
                                    value={props.values.informacoesUsuario.estado}
                                    onChange={props.handleChange}
                                />
                            </div>
                            <div className="linha">
                                <input
                                    type="text"
                                    name="informacoesUsuario.status"
                                    placeholder="Status"
                                    value={props.values.informacoesUsuario.status}
                                    onChange={props.handleChange}
                                />
                                <input
                                    type="text"
                                    name="informacoesUsuario.cidade"
                                    placeholder="Cidade"
                                    value={props.values.informacoesUsuario.cidade}
                                    onChange={props.handleChange}
                                />
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
                                    <p>{props.placeholderDocumento}</p>
                                </div>
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
