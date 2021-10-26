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

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            background: 'transparent',
            borderRadius: theme.shape.borderRadius,
            paddingLeft: theme.spacing(3),
            height: '4rem',
            outline: 'none',
            font: '400 1.7rem SFProText',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: theme.spacing(2)
            }
        },
        erro: {
            color: theme.palette.error.main,
            border: `1px solid ${theme.palette.error.main}`,
            '&::placeholder': {
                color: theme.palette.error.main
            }
        },
        normal: {
            color: theme.palette.text.secondary,
            border: '1px solid var(--cor-borda-campos)',
            '&::placeholder': {
                color: theme.palette.text.hint
            }
        }
    })
);

function TextInput(props: TextInputProps) {
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
