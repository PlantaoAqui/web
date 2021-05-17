import React, { createRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import { Link, animateScroll as scroll } from "react-scroll";
import * as Yup from 'yup'
import './styles.css'

import ImagemEntrada from '../../assets/images/landing-page/landingPage-entrada.jpg'
import ImagemMissao from '../../assets/images/landing-page/landingPage-missao.jpg'
import ImagemCarrousel1_0 from '../../assets/images/landing-page/carrousel-1-0.jpg'
import ImagemCarrousel1_1 from '../../assets/images/landing-page/carrousel-1-1.jpg'
import ImagemCarrousel2_0 from '../../assets/images/landing-page/carrousel-2-0.jpg'
import Footer from '../../components/Footer';
import { createStyles, Hidden, makeStyles, Theme } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
        width: 'fit-content'
    },
    carouselDireita: {
        '& > div': {
            float: 'right'
        }
    },
    fotos: {
        height: '100%',
        width: 'auto',
        objectFit: 'cover'
    }
  }),
);

const itemsCarrousel1 = [
    <img key={1} src={ImagemCarrousel1_0} alt="Instituição"/>,
    <img key={2} src={ImagemCarrousel1_1} alt="Formulario"/>
]

const itemsCarrousel2 = [
    <img key={1} src={ImagemCarrousel2_0} alt="Home"/>
]

function Landing () {
    const [activeInput, setActiveInput] = useState(0);
    const [statusEnvio, setStatusEnvio] = useState(0);
    const refDiv = createRef<HTMLDivElement>();
    const classes = useStyles();
    const textoBotao = [
        'Quero ter acesso antecipado',
        'Obrigado por se inscrever!',
        'Email já cadastrado!'
    ]
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Preencha os campos obrigatórios')
          }),
        onSubmit: () => handleSubmit()
    })

    async function handleSubmit() {
        try {
            await api.post('/acesso-antecipado', formik.values)
            formik.resetForm()
            setStatusEnvio(1)
        } catch (error) {
            if (error.response.status === 409){
                formik.resetForm()
                setStatusEnvio(2)
            } else {
                console.log(error)
            }
        }
    }

    return (
        <div className="page-landing">
            <NavBar aba={1} landing/>
            <div className="conteudo">
                <div id="entrada">
                    <div className="texto">
                        <div className="secao-principal">
                            <h1>Entender onde você vai trabalhar agora ficou mais fácil</h1>
                            <p>Verifique a confiabilidade dos seus plantões a partir de uma
                                plataforma otimizada e desenvolvida por uma comunidade de médicos.</p>
                        </div>
                        <div className="secao-acesso">
                            <p>Estamos em fase final de desenvolvimento. Para ter acesso antecipado a
                                nossa plataforma, clique no botão abaixo e cadastre seu email. Em breve
                                você será convidado para integrar a nossa comunidade.</p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`campo-email ${(statusEnvio !== 0 &&  'email-enviado')}`}>
                                    <input value={
                                        activeInput === 1 ? (
                                            formik.values.email
                                        ) : ('')
                                    }
                                    onFocus={() => setActiveInput(1)}
                                    onChange={(change) => {
                                        activeInput === 1 && formik.handleChange(change);
                                    }}
                                    name="email" type="text" placeholder="Email"/>
                                    <button type="submit">{textoBotao[statusEnvio]}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="imagem">
                        <img src={ImagemEntrada} alt="Sobre nos"/>
                    </div>
                </div>
                <div className="saiba-mais">
                    <Link
                        activeClass="active" to="sobrenos" spy={true} smooth={true}
                        offset={-70} duration={500}
                    >
                        Saiba mais sobre nós
                    </Link>
                </div>
                <div id="sobrenos" ref={refDiv}>
                    <h1>
                        Descubra os melhores plantões
                        <Hidden xsDown><br /></Hidden> e
                        evite as situações indesejadas
                    </h1>
                    <div className="secao">
                        <div className="descricao">
                            <div className="titulo">
                                <h4>Fuja de calotes e trabalhe com maior segurança</h4>
                            </div>
                            <div className="texto">
                                <p>
                                    Nossa plataforma permite que você verifique a reputação
                                    dos locais de plantão, e descubra os valores médios de
                                    pagamento, assim como sua confiabilidade. Por meio da
                                    nossa comunidade você ainda consegue tirar dúvidas e
                                    alertar outros médicos sobre as dificuldades de cada plantão.
                                </p>
                            </div>
                        </div>
                        <div className={'carrousel ' + classes.carouselDireita}>
                            <Carousel
                                interval={6000}
                                className={classes.carousel}
                                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                                    className: "buttons",
                                    style: {
                                        backgroundColor: 'transparent',
                                        borderRadius: 0
                                    }
                                }}
                            >
                                {itemsCarrousel1.map(item => item)}
                            </Carousel>
                        </div>
                    </div>
                    <div className="secao">
                        <div className="carrousel">
                            <Carousel
                                interval={6000}
                                className={classes.carousel}
                                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                                    className: "buttons",
                                    style: {
                                        backgroundColor: 'transparent',
                                        borderRadius: 0
                                    }
                                }}
                            >
                                {itemsCarrousel2.map(item => item)}
                            </Carousel>
                        </div>
                        <div className="descricao">
                            <div className="titulo">
                                <h4>Descubra os plantões de qualidade próximo a você</h4>
                            </div>
                            <div className="texto">
                                <p>
                                    Com uma ferramenta avançada de busca, nossa plataforma
                                    permite que você encontre os melhores plantões da sua
                                    região, assim como selecione os mais adequados as suas
                                    preferências de trabalho.
                                </p>
                            </div>
                            <a onClick={scroll.scrollToTop}>Quero ter acesso a essas ferramentas</a>
                        </div>
                    </div>
                </div>
                <div className="missao">
                    <div className="imagem">
                        <img src={ImagemMissao} alt="Sobre nos"/>
                    </div>
                    <div className="texto">
                        <div className="nossamissao">
                            <h3>Nossa missão</h3>
                            <p>
                                Facilitar as escolhas dos médicos plantonistas egarantir
                                que tenham melhores condições de trabalho e pagamento.
                            </p>
                        </div>
                        <div className="quemsomos">
                            <h3>Quem somos</h3>
                            <p>
                                Uma comunidade de médicos determinada a melhorar as
                                condições de trabalho para plantonistas no Brasil.
                            </p>
                        </div>
                    </div>
                </div>
                <div id="contato">
                    <div className="duvida">
                        <h4>Contato</h4>
                        <p>
                            Caso tenha alguma dúvida, ou interesse em fazer parte do nosso
                            projeto,entre em contato com a gente em <b><a href='mailto:contato@plantaofacil.com'>contato@plantaofacil.com</a></b>
                        </p>
                    </div>
                    <div className="acesso">
                        <p>
                            Para ter acesso antecipado a nossa plataforma, clique no botão abaixo
                            e cadastre seu email. Em breve você será convidado para integrar a nossa comunidade.
                        </p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={`campo-email ${(statusEnvio !== 0 &&  'email-enviado')}`}>
                                <input value={
                                        activeInput === 2 ? (
                                            formik.values.email
                                        ) : ('')
                                    }
                                    onFocus={() => setActiveInput(2)}
                                    onChange={(change) => {
                                        activeInput === 2 && formik.handleChange(change);
                                    }}
                                    name="email" type="text" placeholder="Email"/>
                                <button type="submit">{textoBotao[statusEnvio]}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer landing />
        </div>
    );
}

export default Landing;
