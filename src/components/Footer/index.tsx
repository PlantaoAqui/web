import React from 'react';
import './styles.css';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import LogoFacebook from '../../assets/images/logos/facebookBlack.svg';
import LogoTwitter from '../../assets/images/logos/twitterBlack.svg';
import LogoInsta from '../../assets/images/logos/instaBlack.svg';
import Link from '@material-ui/core/Link';

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
                <div className="conteudo-footer">
                    <div className="links">
                        {landing && links[0]}
                    </div>
                    <div className="redes-sociais">
                        <Link
                            href="https://www.facebook.com/plantaofacil"
                        >
                            <img src={LogoFacebook} alt="Facebook" />
                        </Link>
                        <Link
                            href="https://twitter.com/plantaofacil"
                        >
                            <img src={LogoTwitter} alt="Twitter" />
                        </Link>
                        <Link
                            href="https://www.instagram.com/plantao.facil"
                        >
                            <img src={LogoInsta} alt="Instagram" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
