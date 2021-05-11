import React from 'react';
import './styles.css';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import { Link } from 'react-router-dom';

interface TipoFooter {
    landing?: boolean;
}

function Footer ({ landing }: TipoFooter) {
    const links = [
        <>
            <a href="#sobrenos">Sobre nós</a>
            <a href="#contato">Fale conosco</a>
            <a href='mailto:contato@plantaofacil.com'>
                contato@plantaofacil.com
            </a>
        </>
    ]
    return (
        <div className="barra-footer">
            <div className="footer">
                <div className="logo">
                    <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                    <p>© Plantão Fácil 2021, Todos os direitos reservados.</p>
                </div>
                <div className="links">
                    {landing && links[0]}
                </div>
            </div>
        </div>
    );
}

export default Footer;
