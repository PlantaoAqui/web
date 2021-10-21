import React, { createRef, useState } from 'react';
import { useFormik } from 'formik';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import * as Yup from 'yup';
import { Link as LinkScroll } from 'react-scroll';

import ImagemPc from '../../assets/images/landing-page/pc.png';
import ImagemMobile from '../../assets/images/landing-page/phone.png';
import mobile1 from '../../assets/images/landing-page/mobile1.jpg';
import mobile2 from '../../assets/images/landing-page/mobile2.jpg';
import mobile3 from '../../assets/images/landing-page/mobile3.jpg';
import IconeHospital from '../../assets/images/icones/hospital.svg';
import IconeFicha from '../../assets/images/icones/ficha.svg';
import BolhaAzul from '../../assets/images/landing-page/azul.svg';
import BolhaVerde from '../../assets/images/landing-page/verde.svg';

import Footer from '../../components/Footer';
import { createStyles, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
        },
        content: {
            margin: '10vh 5vw 0'
        },
        secao: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing(4),
            marginBottom: '16rem',
            '& h1': {
                fontWeight: 600,
                marginBottom: theme.spacing(14)
            },
            '& h5': {
                marginBottom: theme.spacing(12)
            },
            '& img': {
                left: '40vw',
                height: '100%'
            }
        },
        secaoOverflow: {
            height: '80vh',
            maxHeight: '60rem',
            position: 'relative',
            '& h1': {
                maxWidth: '40rem'
            },
            '& h6': {
                marginBottom: theme.spacing(4)
            },
            '& img': {
                position: 'absolute',
                left: '40vw',
                height: '100%'
            },
            '& form': {
                width: '100%'
            }
        },
        conteudoSecao: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        },
        imagensCelular: {
            position: 'relative',
            '& img:first-child': {
                padding: '0 1rem'
            },
            '& img': {
                position: 'absolute',
                marginLeft: '12rem',
                marginTop: '6rem',
                left: 0,
                width: '26rem',
                height: 'auto'
            }
        },
        itemNumerado: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '1.2rem',
            marginLeft: '-1.2rem',
            marginBottom: '1.2rem',
            border: '1px solid transparent',
            cursor: 'context-menu',
            borderRadius: theme.shape.borderRadius,
            transition: theme.transitions.create(['background', 'border']),
            '& p:first-child': {
                fontSize: '8rem',
                width: '8rem'
            },
            '& p': {
                fontSize: '3.2rem',
                lineHeight: '3.6rem',
                letterSpacing: '-1px',
                maxWidth: '32rem',
                fontWeight: 600
            },
            '&:hover': {
                background: theme.palette.action.hover,
                borderColor: 'var(--cor-fundo-card-hover)'
            }
        },
        interesse: {
            marginTop: '6rem',
            '& h4': {
                fontWeight: 600
            }
        },
        interesses: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            marginTop: '2rem',
            gap: '1.2rem'
        },
        botaoInteresse: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '1.2rem',
            cursor: 'pointer',
            '& img': {
                height: '6rem',
                width: 'auto',
                marginRight: '1.2rem'
            }
        },
        contato: {
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            '& h4': {
                fontSize: '3rem',
                fontWeight: 600,
                marginBottom: '4rem'
            },
            '& h6': {
                fontWeight: 500,
                marginBottom: '1.2rem'
            },
            '& form': {
                width: '100%'
            }
        },
        campoEmail: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%',
            '& input': {
                width: '70%',
                border: '1px solid black',
                color: 'var(--cor-texto-escuro)',
                background: 'transparent',
                borderRadius: '0.8rem 0 0 0.8rem',
                paddingLeft: '1.3rem',
                height: '4rem',
                outline: 'none',
                font: '400 1.7rem SFProText',
                transition: '0.2s'
            },
            '& button': {
                width: '30%',
                background: 'black',
                color: 'var(--cor-fundo-principal)',
                font: '400 1.7rem SFProText',
                outline: 'none',
                border: 'none',
                borderRadius: '0 0.8rem 0.8rem 0',
                cursor: 'pointer',
                transition: '0.2s'
            }
        },
        emailSubmetido: {
            '& input': {
                width: 0,
                opacity: 0,
                borderWidth: 0,
                padding: 0
            },
            '& button': {
                width: '100%',
                height: '4rem',
                borderRadius: '0.8rem'
            }
        },
        background: {
            zIndex: -10
        },
        circuloVerde: {
            position: 'absolute',
            top: '-15rem',
            left: '-60rem',
            width: '110vw'
        },
        circuloAzul: {
            position: 'absolute',
            top: '110rem',
            right: '-70rem',
            width: '110vw'
        }
    })
);

function Landing () {
    const [emailEnviado, setEmailEnviado] = useState(false);
    const [statusEnvio, setStatusEnvio] = useState(0);
    const [imagemMobile, setImagemMobile] = useState(mobile1);
    const refDiv = createRef<HTMLDivElement>();
    const classes = useStyles();
    const textoBotao = [
        'Enviar',
        'Obrigado por se inscrever!',
        'Email já cadastrado!'
    ];
    const textoContato = [
        'Enviar',
        'Obrigado, entraremos em contato',
        'Email já cadastrado!'
    ];
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Preencha os campos obrigatórios')
        }),
        onSubmit: () => handleSubmit()
    });

    async function handleSubmit () {
        try {
            await api.post('/acesso-antecipado', formik.values);
            setEmailEnviado(true);
            formik.resetForm();
            setStatusEnvio(1);
        } catch (error) {
            if (error.response.status === 409) {
                formik.resetForm();
                setStatusEnvio(2);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <div className={classes.root}>
            <NavBar tipoLinks="landing"/>
            <div className={classes.content}>
                <div id="cadastro" ref={refDiv} className={classes.secao + ' ' + classes.secaoOverflow}>
                    <div className={classes.conteudoSecao} style={{ width: '40%' }}>
                        <Typography
                            variant="h1" color="textPrimary"
                        >
                            Descubra de maneira fácil o seu próximo plantão.
                        </Typography>
                        <Typography
                            variant="h5" color="textPrimary"
                        >
                            Verifique a confiabilidade dos seus plantões a partir
                            de uma plataforma otimizada e desenvolvida por uma
                            comunidade de médicos.
                        </Typography>
                        <Typography
                            variant="subtitle1" color="textPrimary"
                        >
                            Insira seu email para ter acesso antecipado as nossas ferramentas.
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={`${classes.campoEmail} ${emailEnviado && classes.emailSubmetido}`}>
                                <input
                                    disabled={emailEnviado}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    style={{
                                        borderColor: '#7BB2ED',
                                        background: 'white',
                                        opacity: 0.6
                                    }}
                                    name="email" type="text" placeholder="Email"
                                />
                                <button type="submit"
                                    style={{ background: '#7BB2ED' }}
                                >
                                    {textoBotao[statusEnvio]}
                                </button>
                            </div>
                        </form>
                    </div>
                    <img src={ImagemPc} alt="Plantão fácil" />
                </div>
                <div id="sobrenos" ref={refDiv} className={classes.secao}>
                    <div className={classes.imagensCelular}>
                        <img src={imagemMobile} alt="Plantão fácil"/>
                        <img src={ImagemMobile} alt="Celular"/>
                    </div>
                    <div className={classes.conteudoSecao}>
                        <Typography
                            variant="h1" color="textPrimary"
                        >
                            O que oferecemos
                        </Typography>
                        <div className={classes.itemNumerado}
                            style={{ color: '#7BB2ED' }}
                            onMouseEnter={() => setImagemMobile(mobile1)}
                        >
                            <p>1</p>
                            <p>Banco de avaliação de plantões médicos</p>
                        </div>
                        <div className={classes.itemNumerado}
                            style={{ color: '#FF817C' }}
                            onMouseEnter={() => setImagemMobile(mobile2)}
                        >
                            <p>2</p>
                            <p>Consolidador de carteira de plantões</p>
                        </div>
                        <div className={classes.itemNumerado}
                            style={{ color: '#FCC077' }}
                            onMouseEnter={() => setImagemMobile(mobile3)}
                        >
                            <p>3</p>
                            <p>Ofertas de vagas de plantão médico</p>
                        </div>
                        <div className={classes.interesse}>
                            <Typography
                                variant="h4" color="textPrimary"
                            >
                                Ficou interessado no que oferecemos?
                            </Typography>
                            <div className={classes.interesses}>
                                <LinkScroll className={classes.botaoInteresse}
                                    activeClass="active" to="cadastro"
                                    spy={true} smooth={true}
                                    offset={-70} duration={500}
                                >
                                    <img src={IconeHospital} alt="Médico" />
                                    <Typography
                                        variant="h6" color="textPrimary"
                                    >
                                        Sou médico e quero me cadastrar
                                    </Typography>
                                </LinkScroll>
                                <div className={classes.botaoInteresse}>
                                    <img src={IconeFicha} alt="Médico" />
                                    <Typography
                                        variant="h6" color="textPrimary"
                                    >
                                        Sou gestor e quero ofertar meus plantões
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contato" ref={refDiv} className={classes.secao}>
                    <div className={classes.contato}>
                        <Typography
                            variant="h4" color="textPrimary"
                        >
                            Estaremos sempre ao seu lado, trabalhando
                            incansavelmente para seu sucesso.
                        </Typography>
                        <Typography
                            variant="h6" color="textPrimary"
                        >
                            Nosso time de especialistas pode te ajudar agora,
                            envie o seu email para entrarmos em contato.
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={`${classes.campoEmail} ${emailEnviado && classes.emailSubmetido}`}>
                                <input
                                    disabled={emailEnviado}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    name="email" type="text" placeholder="Email"
                                />
                                <button type="submit">{textoContato[statusEnvio]}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer landing />
            <div className={classes.background}>
                <div className={classes.circuloVerde}>
                    <img src={BolhaVerde} />
                </div>
                <div className={classes.circuloAzul}>
                    <img src={BolhaAzul} />
                </div>
            </div>
        </div>
    );
}

export default Landing;
