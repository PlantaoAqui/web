import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';
import { Link as LinkScroll } from 'react-scroll';

import LogoPlantaoFacil from '../../../assets/images/logos/plantaoFacilFundoVerde.svg';
import LogoFacebook from '../../../assets/images/logos/facebookBlack.svg';
import LogoTwitter from '../../../assets/images/logos/twitterBlack.svg';
import LogoInsta from '../../../assets/images/logos/instaBlack.svg';

interface DrawerMobileProps {
    open: boolean;
    tipoLinks: 'none' | 'landing' | 'default';
    handleDrawerToggle: () => void;
    abrirModalAvaliacao: () => void;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        drawerPaper: {
            width: '75vw',
            maxWidth: '30rem',
            background: '#A1E09E',
            marginTop: '4.8rem',
            paddingBottom: '4.8rem',
            padding: theme.spacing(2)
        },
        drawerLanding: {
            marginTop: theme.mixins.toolbar.minHeight,
            paddingBottom: theme.mixins.toolbar.minHeight
        },
        secao: {
            borderRadius: theme.spacing(2),
            margin: theme.spacing(2, 1),
            padding: theme.spacing(2),
            border: '1px solid white'
        },
        tituloSecao: {
            marginBottom: theme.spacing(2.5)
        },
        linkSecao: {
            textDecoration: 'none',
            alignSelf: 'center',
            height: 'fit-content',
            padding: '0.4rem 0',
            font: '400 1.6rem SFProText',
            color: 'var(--cor-texto-escuro)',
            cursor: 'pointer'
        },
        espaco: {
            flexGrow: 1
        },
        contato: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        redesSociais: {
            '& img': {
                margin: theme.spacing(0.5, 0.25)
            }
        },
        logo: {
            padding: theme.spacing(2, 4),
            display: 'flex',
            flexDirection: 'column',
            '& img': {
                marginBottom: theme.spacing(1),
                maxHeight: '3rem',
                width: 'fit-content'
            }
        }
    })
);

function DrawerMobile({ open, tipoLinks, handleDrawerToggle }: DrawerMobileProps) {
    const classes = useStyles();

    const links: Record<'none' | 'landing' | 'default', JSX.Element> = {
        none: <></>,
        landing: (
            <div className={classes.secao}>
                <Typography
                    variant="h3" gutterBottom
                    className={classes.tituloSecao}
                >
                    MENU
                </Typography>
                <LinkScroll
                    activeClass="active" to="sobrenos" spy={true} smooth={true}
                    offset={-70} duration={500} className={classes.linkSecao}
                    onClick={handleDrawerToggle}
                >
                    <Typography variant="h4" gutterBottom>
                        Sobre Nós
                    </Typography>
                </LinkScroll>
                <LinkScroll
                    activeClass="active" to="contato" spy={true} smooth={true}
                    offset={-70} duration={500} className={classes.linkSecao}
                    onClick={handleDrawerToggle}
                >
                    <Typography variant="h4" gutterBottom>
                        Fale Conosco
                    </Typography>
                </LinkScroll>
                <Link href="/login" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                </Link>
            </div>
        ),
        default: (
            <div className={classes.secao}>
                <Typography
                    variant="h3" gutterBottom
                    className={classes.tituloSecao}
                >
                    MENU
                </Typography>
                {/* <Link href="/plantoes" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Pesquisar
                    </Typography>
                </Link> */}
                <Link href="/plantoes" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Plantões
                    </Typography>
                </Link>
                <Link href="/perfil" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Avaliações
                    </Typography>
                </Link>
                <Link href="/carteira" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Minha carteira
                    </Typography>
                </Link>
                {/* <Link onClick={abrirModalAvaliacao} className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Nova Avaliação
                    </Typography>
                </Link> */}
                <Link href="/perfil" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Minha conta
                    </Typography>
                </Link>
            </div>
        )
    };

    return (
        <Drawer
            elevation={1}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerToggle}
            classes={{
                paper: `${classes.drawerPaper} ${tipoLinks === 'landing' && classes.drawerLanding}`
            }}
            ModalProps={{
                keepMounted: true,
                BackdropProps: {
                    invisible: true
                }
            }}
        >
            {links[tipoLinks]}
            <div className={classes.espaco}/>
            <div className={classes.secao}>
                <div className={classes.contato}>
                    <Typography
                        variant="h3" gutterBottom
                        className={classes.tituloSecao}
                    >
                        Contato
                    </Typography>
                    <div className={classes.redesSociais}>
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
                <a href="mailto:contato@plantaofacil.com" className={classes.linkSecao}>
                    <Typography variant="h4">
                        contato@plantaofacil.com
                    </Typography>
                </a>
            </div>
            <div className={classes.logo}>
                <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                <Typography variant="caption" align="left">
                    © Plantão Fácil 2021, Todos os direitos reservados.
                </Typography>
            </div>
        </Drawer>
    );
}

export default DrawerMobile;
