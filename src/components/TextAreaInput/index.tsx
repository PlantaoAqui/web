import React, { ChangeEventHandler, CSSProperties } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            background: 'transparent',
            border: '1px solid var(--cor-borda-campos)',
            borderRadius: '0.8rem',
            padding: '0.6rem 1.3rem',
            width: '100%',
            outline: 'none',
            font: '400 1.7rem SFProText',
            color: 'var(--cor-texto-claro)',
            '& textarea': {
                outline: 'none',
                width: '100%',
                resize: 'none',
                font: '400 1.2rem SFProText',
                background: 'transparent',
                border: 'none',
                marginTop: '0.6rem'
            }
        }
    })
);

interface TextAreaInputProps {
    titulo?: string;
    descricao: string;
    style?: CSSProperties;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

function TextAreaInput(props: TextAreaInputProps) {
    const classes = useStyles();
    return (
        <div className={classes.root} style={props.style}>
            {props.titulo && (
                <Typography
                    variant="subtitle1" color="textPrimary" gutterBottom
                >
                    {props.titulo}
                </Typography>
            )}
            <TextareaAutosize
                name={props.name}
                aria-label={props.titulo}
                rowsMin={3}
                placeholder={props.descricao}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default TextAreaInput;
