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

interface FormCadastroLogin {
    titulo: string;
    subtitulo?: string;
    rodape?: string;
    textoBotao: string;
    values: {
        email: string,
        senha: string
    },
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleSubmit: () => void;
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

function FormLogin (props: FormCadastroLogin) {
    const classes = useStyles();

    return (
        <div className="modal-login">
            <form onSubmit={props.handleSubmit}>
                <div className="titulo">
                    <h1>{props.titulo}</h1>
                </div>
                {props.subtitulo && (
                    <div className="subtitulo">
                        <h3>{props.subtitulo}</h3>
                    </div>
                )}
                <div className="conteudo">
                    <>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={props.values.email}
                            onChange={props.handleChange}
                        />
                        <input
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={props.values.senha}
                            onChange={props.handleChange}
                        />
                        <p className="rodape">{props.rodape}</p>
                        <button style={{background: "#CFEACA"}} type="submit">{props.textoBotao}</button>
                    </>
                </div>

            </form>
        </div>
    );
}

export default FormLogin;
