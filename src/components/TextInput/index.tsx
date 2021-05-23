import { makeStyles, createStyles } from '@material-ui/core';
import React from 'react';
import './styles.css';

interface TextInputProps {
    type?: string;
    name?: string;
    placeholder?: string;
    value: string;
    data?: boolean;
    error?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (e: React.FocusEvent<unknown>) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        erro: {
            color: 'var(--cor-vermelha-warning)',
            border: '1px solid var(--cor-vermelha-warning)',
            '&::placeholder': {
                color: 'var(--cor-vermelha-warning)'
            }
        },
        normal: {
            color: 'var(--cor-texto-escuro)',
            border: '1px solid var(--cor-borda-campos)',
            '&::placeholder': {
                color: 'var(--cor-texto-claro)'
            }
        }
    })
);

function TextInput (props: TextInputProps) {
    const classes = useStyles();
    return (
        <input
            type={props.type || 'text'}
            onFocus={(e) => {
                if (props.data) {
                    e.target.type = 'date';
                }
            }}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            className={props.error ? classes.erro : classes.normal}
        />
    );
}

export default TextInput;
