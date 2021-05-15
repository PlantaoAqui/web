import React from 'react';
import './styles.css';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import LogoFacebook from '../../assets/images/logos/facebookBlack.svg';
import LogoTwitter from '../../assets/images/logos/twitterBlack.svg';
import LogoInsta from '../../assets/images/logos/instaBlack.svg';

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
                    <div className="redes-sociais">
                        <img src={LogoFacebook} alt="Facebook" />
                        <img src={LogoTwitter} alt="Twitter" />
                        <img src={LogoInsta} alt="Instagram" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
