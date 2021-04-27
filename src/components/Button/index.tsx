import React from 'react';
import './styles.css';

interface ButtonProps {
    background: string;
    texto: string;
    type: 'button' | 'reset' | 'submit'
}

function Button (props: ButtonProps) {
    const { background, texto, type } = props;
    return (
        <div className="styled-button">
            <button style={{background}} type={type}>{texto}</button>
        </div>
    );
}

export default Button;
