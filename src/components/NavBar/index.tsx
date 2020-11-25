import React from 'react';
import './styles.css';

import logoPlantaoAqui from '../../assets/images/logos/logoPlantaoAqui.svg';
import { Link } from 'react-router-dom';

interface LinksNavbar {
    aba: number;
}

function NavBar ({aba}: LinksNavbar) {
    return (
        <div className="navbar">
            <div className="metade1">
                <Link to="/">
                    <img src={logoPlantaoAqui} alt="Plantao Aqui"/>
                </Link>
                <input type="text" placeholder="Digite sua busca"/>
                {/* <div className="barrapesquisa">
                    <input type="text"/>
                </div> */}
            </div>
            <div className="metade2">
                <Link to="/plantoes" style={aba === 1 ? {borderBottom: "2px solid #256C14"} : {}}>
                    <div className="link" style={aba === 1 ? {color: "#256C14"} : {color: "#DFDFDF"}}
                    >
                        Plantões
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 2 ? {borderBottom: "2px solid #256C14"} : {}}>
                    <div className="link" style={aba === 2 ? {color: "#256C14"} : {color: "#DFDFDF"}}
                    >
                        Ranking
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 3 ? {borderBottom: "2px solid #256C14"} : {}}>
                    <div className="link" style={aba === 3 ? {color: "#256C14"} : {color: "#DFDFDF"}}
                    >
                        Ofertas
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 4 ? {borderBottom: "2px solid #256C14"} : {}}>
                    <div className="link" style={aba === 4 ? {color: "#256C14"} : {color: "#DFDFDF"}}
                    >
                        Nova Avaliação
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 5 ? {borderBottom: "2px solid #256C14"} : {}}>
                    <div className="link" style={aba === 5 ? {color: "#256C14"} : {color: "#DFDFDF"}}
                    >
                        Seja Premium
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;