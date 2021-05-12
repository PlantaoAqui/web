import React from 'react';
import './styles.css';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import { Link } from 'react-router-dom';
import Button from '../Button';

interface LinksNavbar {
    aba: number;
    landing?: boolean;
}

function NavBar ({ aba, landing }: LinksNavbar) {
    const links = [
        <>
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
        </>,
        <>
            <a href="#sobrenos">Sobre nós</a>
            <a href="#contato">Fale conosco</a>
            <Link to="#" style={{ display: 'none' }}>
                <div
                    className="link"
                    style={aba === 5 ? {color: "black"} : {color: "#3E3E3E"}}
                >
                    Log In
                </div>
            </Link>
            <Button
                background="#A1E09E"
                texto="Faça Parte"
                type='button'
            />
        </>
    ]

    return (
        <div className="barra-navbar">
            <div className="navbar">
                <div className="logo" style={landing ? {
                    flex: 1
                } : {
                }}>
                    <Link to="/">
                        <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                    </Link>
                </div>
                <div className="links" style={landing ? {
                    width: '35%'
                } : {
                    width: '70%'
                }}>
                    {landing ? links[1] : links[0]}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
