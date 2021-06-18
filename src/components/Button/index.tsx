import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button as ButtonMaterialUI } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        botao: {
            width: '100%',
            background: 'var(--cor-fundo-card-hover)',
            outline: 'none',
            borderRadius: '0.8rem',
            border: 'none',
            height: '4rem',
            cursor: 'pointer',
            textTransform: 'none',
            font: '400 1.4rem SFProText',
            color: 'var(--cor-texto-escuro)'
        }
    })
);

interface ButtonProps {
    background?: string;
    texto: string;
    tamanhoTexto?: 'default' | 'big';
    onClick?: () => void;
    type: 'button' | 'reset' | 'submit'
}

function Button (props: ButtonProps) {
    const classes = useStyles();
    const { background = '#DDDDDD', onClick, texto, type } = props;
    const fontSize = props.tamanhoTexto === 'big'
        ? '2.4rem'
        : '1.4rem';
    return (
        <ButtonMaterialUI
            type={type}
            variant='contained'
            className={classes.botao}
            onClick={onClick}
            style={{
                background,
                fontSize
            }}
        >
            {texto}
        </ButtonMaterialUI>
    );
}

export default Button;
