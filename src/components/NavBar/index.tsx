import React from 'react';
import './styles.css';

import logoPlantaoAqui from '../../assets/images/logos/logoPlantaoAqui.svg';
import { Link } from 'react-router-dom';

interface LinksNavbar {
    aba: number;
}

function NavBar ({aba}: LinksNavbar) {
    return (
        <div className="barra">
            <div className="navbar">
                <Link to="/">
                    <h3 className="logo">To de Plantão</h3>
                </Link>
                <Link to="/plantoes" style={aba === 0 ? {borderBottom: "2px solid black"} : {}}>
                    <div className="link" style={aba === 1 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Pesquisar
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 1 ? {borderBottom: "2px solid black"} : {}}>
                    <div className="link" style={aba === 1 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Plantões
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 2 ? {borderBottom: "2px solid black"} : {}}>
                    <div className="link" style={aba === 2 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Cursos
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 3 ? {borderBottom: "2px solid black"} : {}}>
                    <div className="link" style={aba === 3 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Ofertas
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 4 ? {borderBottom: "2px solid black"} : {}}>
                    <div className="link" style={aba === 4 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Nova Avaliação
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 5 ? {borderBottom: "2px solid black"} : {}}>
                    <div className="link" style={aba === 5 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Minha conta
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
