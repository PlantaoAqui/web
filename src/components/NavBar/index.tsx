import React, { useState } from 'react';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import { Link } from 'react-router-dom';
import { AppBar, Button, createStyles, Drawer, Hidden, IconButton, makeStyles, Theme, Toolbar } from '@material-ui/core';

import { Link as LinkScroll } from "react-scroll";

import IconeMenu from '../../assets/images/icones/hamburguerMenu.svg'
import DrawerMobile from './components/DrawerMobile';

interface LinksNavbar {
    aba: number;
    landing?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
        background: 'white',
        [theme.breakpoints.down('sm')]: {
            zIndex: theme.zIndex.modal + 1,
        },
    },
    logo: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            '& img': {
                width: '40vw',
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

function NavBar ({ aba, landing }: LinksNavbar) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
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
                    className="link"
                    style={aba === 5 ? {color: "black"} : {color: "#3E3E3E"}}
                >
                    Log In
                </div>
            </Link>
        </div>
    ]

    return (
        <AppBar className={classes.appBar} elevation={4}>
            <Toolbar>
                <div className={classes.logo}>
                    <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                </div>
                <Hidden xsDown>
                    {landing ? links[1] : links[0]}
                </Hidden>
                <Hidden smUp>
                    <IconButton onClick={handleDrawerToggle}>
                        <img src={IconeMenu} alt="Menu" />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Hidden smUp>
                <DrawerMobile
                    open={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />
            </Hidden>
        </AppBar>
    );
}

export default NavBar;
