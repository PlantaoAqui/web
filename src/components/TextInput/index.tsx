import React, { useState } from 'react';
import './styles.css';

interface TextInputProps {
    type?: string;
    name?: string;
    placeholder?: string;
    value: string;
    data?: boolean;
    handleChange: (e: React.ChangeEvent<any>) => void;
}

function TextInput (props: TextInputProps) {
    return (
        <input
            type={props.type || "text"}
            onFocus={(e) => props.data ? e.target.type='date' : {}}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
        />
    );
}

export default TextInput;
