import React, { useState } from 'react';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import { Link } from 'react-router-dom';
import { AppBar, Button, createStyles, Drawer, Hidden, IconButton, makeStyles, Theme, Toolbar } from '@material-ui/core';

import { Link as LinkScroll } from "react-scroll";

import IconeMenu from '../../assets/images/icones/hamburguerMenu.svg'
import DrawerMobile from './components/DrawerMobile';

interface LinksNavbar {
    aba?: number;
    tipoLinks: 'none' | 'landing' | 'default'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
        background: 'white',
        [theme.breakpoints.down('md')]: {
            zIndex: theme.zIndex.modal + 1,
        },
    },
    toolbar: {
        [theme.breakpoints.up('lg')]: {
            width: '1200px',
            margin: '0 auto'
        },
        [theme.breakpoints.up('xl')]: {
            width: '1400px',
            maxWidth: '1400px'
        }
    },
    logo: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            '& img': {
                maxHeight: '3rem',
            }
        },
    },
    linksLanding: {
        width: '25%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    linksDefault: {
        width: '75%',
        maxWidth: '750px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    link: {
        textDecoration: 'none',
        alignSelf: 'center',
        height: 'fit-content',
        padding: '0.4rem 0',
        font: '400 1.6rem SFProText',
        color: 'var(--cor-texto-escuro)',
        cursor: 'pointer'
    }
  }),
);

function NavBar ({ aba, tipoLinks }: LinksNavbar) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const links: Record<'none' | 'landing' | 'default', JSX.Element> = {
        none: <></>,
        landing:
            <div className={classes.linksLanding}>
                <LinkScroll
                    activeClass="active" to="sobrenos" spy={true} smooth={true}
                    offset={-70} duration={500} className={classes.link}
                >
                    Sobre nós
                </LinkScroll>
                <LinkScroll
                    activeClass="active" to="contato" spy={true} smooth={true}
                    offset={-70} duration={500} className={classes.link}
                >
                    Fale conosco
                </LinkScroll>
                <Link to="#" style={{ display: 'none' }}>
                    <div
                        className={classes.link}
                        style={aba === 5 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Log In
                    </div>
                </Link>
            </div>,
        default:
            <div className={classes.linksDefault}>
                <Link to="/plantoes" style={aba === 0 ? {borderBottom: "2px solid black"} : {}}>
                    <div className={classes.link} style={aba === 0 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Pesquisar
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 1 ? {borderBottom: "2px solid black"} : {}}>
                    <div className={classes.link} style={aba === 1 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Plantões
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 2 ? {borderBottom: "2px solid black"} : {}}>
                    <div className={classes.link} style={aba === 2 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Cursos
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 3 ? {borderBottom: "2px solid black"} : {}}>
                    <div className={classes.link} style={aba === 3 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Ofertas
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 4 ? {borderBottom: "2px solid black"} : {}}>
                    <div className={classes.link} style={aba === 4 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Nova Avaliação
                    </div>
                </Link>
                <Link to="/plantoes" style={aba === 5 ? {borderBottom: "2px solid black"} : {}}>
                    <div className={classes.link} style={aba === 5 ? {color: "black"} : {color: "#3E3E3E"}}
                    >
                        Minha conta
                    </div>
                </Link>
            </div>,
    }

    return (
        <AppBar className={classes.appBar} elevation={4}>
            <Toolbar className={classes.toolbar}>
                <div className={classes.logo}>
                    <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                </div>
                <Hidden mdDown>
                    {links[tipoLinks]}
                </Hidden>
                <Hidden lgUp>
                    <IconButton onClick={handleDrawerToggle}>
                        <img src={IconeMenu} alt="Menu" />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Hidden lgUp>
                <DrawerMobile
                    open={mobileOpen}
                    tipoLinks={tipoLinks}
                    handleDrawerToggle={handleDrawerToggle}
                />
            </Hidden>
        </AppBar>
    );
}

export default NavBar;
