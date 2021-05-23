import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React, { ChangeEventHandler } from 'react';
import './styles.css';

interface TextAreaInputProps {
    titulo: string;
    descricao: string;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

function TextAreaInput (props: TextAreaInputProps) {
    return (
        <div className="text-area-input">
            <h3>{props.titulo}</h3>
            <TextareaAutosize
                name={props.name}
                aria-label={props.titulo}
                rowsMin={2}
                placeholder={props.descricao}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default TextAreaInput;
