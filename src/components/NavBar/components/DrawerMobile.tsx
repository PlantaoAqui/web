import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import LogoPlantaoFacil from '../../../assets/images/logos/plantaoFacilFundoVerde.svg';
import LogoFacebook from '../../../assets/images/logos/facebookBlack.svg';
import LogoTwitter from '../../../assets/images/logos/twitterBlack.svg';
import LogoInsta from '../../../assets/images/logos/instaBlack.svg';

interface DrawerMobileProps {
    open: boolean;
    handleDrawerToggle: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: '60vw',
        background: '#A1E09E',
    },
    secao: {
        borderRadius: theme.spacing(2),
        margin: theme.spacing(5, 1),
        padding: theme.spacing(2),
        border: '1px solid white',
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
    },
    espaco: {
        flexGrow: 1
    },
    redesSociais: {
        '& img': {
            margin: theme.spacing(0.5, 0.25)
        }
    },
    logo: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        '& img': {
            marginBottom: theme.spacing(1)
        }
    }
  }),
);

function DrawerMobile ({ open, handleDrawerToggle }: DrawerMobileProps) {
    const classes = useStyles();

    return (
        <Drawer
            elevation={1}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{
                keepMounted: true,
                BackdropProps: {
                    invisible: true
                }
            }}
        >
            <div className={classes.toolbar} />
            <div className={classes.secao}>
                <Typography
                    variant="h3" gutterBottom
                    className={classes.tituloSecao}
                >
                    MENU
                </Typography>
                <a href="#sobrenos" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Sobre Nós
                    </Typography>
                </a>
                <a href="#contato" className={classes.linkSecao}>
                    <Typography variant="h4" gutterBottom>
                        Fale Conosco
                    </Typography>
                </a>
            </div>
            <div className={classes.espaco}/>
            <div className={classes.secao}>
                <Typography
                    variant="h3" gutterBottom
                    className={classes.tituloSecao}
                >
                    Contato
                </Typography>
                <a href="mailto:contato@plantaofacil.com" className={classes.linkSecao}>
                    <Typography variant="body1">
                        contato@plantaofacil.com
                    </Typography>
                    <div className={classes.redesSociais}>
                        <img src={LogoFacebook} alt="Facebook" />
                        <img src={LogoTwitter} alt="Twitter" />
                        <img src={LogoInsta} alt="Instagram" />
                    </div>
                </a>
            </div>
            <div className={classes.logo}>
                <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                <Typography variant="caption" align="center">
                    © Plantão Fácil 2021, Todos os direitos reservados.
                </Typography>
            </div>
        </Drawer>
    );
}

export default DrawerMobile;
