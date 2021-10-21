import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

interface TextInputProps {
    type?: string;
    name?: string;
    placeholder?: string;
    gutterBottom?: boolean;
    value: string;
    disabled?: boolean;
    data?: boolean;
    error?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (e: React.FocusEvent<unknown>) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            background: 'transparent',
            borderRadius: '0.8rem',
            paddingLeft: '1.3rem',
            height: '4rem',
            outline: 'none',
            font: '400 1.7rem SFProText',
            width: '100%'
        },
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
    const marginBottom = props.gutterBottom ? '1.2rem' : '0';
    return (
        <input
            className={`${classes.root} ${props.error ? classes.erro : classes.normal}`}
            type={props.type || 'text'}
            disabled={props.disabled}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            onFocus={(e) => {
                if (props.data) {
                    e.target.type = 'date';
                }
            }}
            style={{
                marginBottom
            }}
        />
    );
}

export default TextInput;
