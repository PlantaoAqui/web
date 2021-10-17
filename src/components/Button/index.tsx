import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button as ButtonMaterialUI } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        botao: {
            width: '100%',
            // background: 'var(--cor-fundo-card-hover)',
            outline: 'none',
            borderRadius: '0.8rem',
            color: 'var(--cor-texto-escuro)'
        }
    })
);

interface ButtonProps {
    background?: string;
    texto: string;
    tamanhoTexto?: 'default' | 'big';
    variant?: 'outlined' | 'contained';
    size?: 'default' | 'small';
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    dark?: boolean;
    onClick?: () => void;
    type: 'button' | 'reset' | 'submit'
}

function Button (props: ButtonProps) {
    const classes = useStyles();
    const {
        variant = 'contained',
        background = variant === 'contained' ? '#DDDDDD' : '',
        dark = false,
        textTransform = 'uppercase',
        size = 'default',
        onClick,
        texto,
        type
    } = props;

    const fontSize = props.tamanhoTexto === 'big'
        ? '2.4rem'
        : '1.4rem';

    const height = size === 'default'
        ? '4rem'
        : '3.2rem';

    const color = dark ? 'var(--cor-fundo-campos)' : 'var(--cor-texto-escuro)';

    return (
        <ButtonMaterialUI
            type={type}
            variant={variant}
            className={classes.botao}
            onClick={onClick}
            disableElevation
            style={{
                textTransform,
                background,
                fontSize,
                color,
                height
            }}
        >
            {texto}
        </ButtonMaterialUI>
    );
}

export default Button;
