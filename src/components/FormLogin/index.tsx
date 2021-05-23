import React, { useEffect, useState } from 'react';
import TextInput from '../TextInput';
import './styles.css';

interface FormCadastroLogin {
    titulo: string;
    subtitulo?: string;
    mensagemErro?: string;
    rodape?: string;
    textoBotao: string;
    values: {
        email: string,
        senha: string
    };
    errors: {
        email?: string | undefined,
        senha?: string | undefined
    };
    touched: {
        email?: boolean,
        senha?: boolean
    };
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur: (e: React.FocusEvent<unknown>) => void;
    handleSubmit: () => void;
}

function FormLogin (props: FormCadastroLogin) {
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(() => {
        setErro(!!props.mensagemErro ||
            (!!props.errors.email && !!props.touched.email) ||
            (!!props.errors.senha && !!props.touched.senha));
        setMensagemErro(props.mensagemErro ||
            (props.touched.email && props.errors.email) ||
            (props.touched.senha && props.errors.senha) || '');
    }, [props.mensagemErro, props.errors, props.touched]);

    return (
        <div className="modal-login">
            <form onSubmit={props.handleSubmit}>
                <div className="titulo">
                    <h1>{props.titulo}</h1>
                </div>
                {props.subtitulo && (
                    <div className="subtitulo" style={erro ? { color: 'var(--cor-vermelha-warning)' } : { color: 'var(--cor-texto-claro)' }}>
                        <h3>{mensagemErro || props.subtitulo}</h3>
                    </div>
                )}
                <div className="conteudo">
                    <TextInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={props.values.email}
                        error={!!props.errors.email && !!props.touched.email}
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                    />
                    <TextInput
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={props.values.senha}
                        error={!!props.errors.senha && !!props.touched.senha}
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                    />
                    <button style={{ background: '#A1E09E' }} type="submit">{props.textoBotao}</button>
                </div>
            </form>
        </div>
    );
}

export default FormLogin;
