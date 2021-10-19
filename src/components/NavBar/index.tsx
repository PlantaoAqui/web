import React, { useEffect, useState } from 'react';

import LogoPlantaoFacil from '../../assets/images/logos/plantaoFacil.svg';
import { Link, useHistory } from 'react-router-dom';

import { Link as LinkScroll } from 'react-scroll';

import IconeMenu from '../../assets/images/icones/hamburguerMenu.svg';
import CloseIcon from '@material-ui/icons/Close';
import DrawerMobile from './components/DrawerMobile';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useSearch from '../../hooks/use-search';
import Button from '../Button';
import InputAdornment from '@material-ui/core/InputAdornment';

interface LinksNavbar {
    tipoLinks: 'none' | 'landing' | 'default'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            [theme.breakpoints.down('md')]: {
                zIndex: theme.zIndex.modal + 1
            }
        },
        logo: {
            width: '30%',
            '& img': {
                height: '3.2rem'
            }
        },
        toolbarBlank: {
            width: '80%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 'auto'
        },
        toolbarLanding: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 'auto'
        },
        logoLinksLanding: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
            justifyContent: 'space-between',
            '& img': {
                height: '3.2rem',
                marginRight: theme.spacing(12)
            },
            '& a:not(:first-child)': {
                cursor: 'pointer',
                marginRight: theme.spacing(6)

            }
        },
        botoesAcesso: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& button': {
                marginLeft: theme.spacing(6),
                width: 'unset'
            }
        },
        toolbarDefault: {
            width: '80%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& a': {
                textDecoration: 'none',
                color: 'inherit'
            }
        },
        pesquisa: {
            width: '40%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: theme.spacing(0, 3)
        },
        search: {
            display: 'flex',
            alignItems: 'center',
            height: '3.2rem',
            marginRight: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'var(--cor-fundo-card)',
            transition: theme.transitions.create('width'),
            width: '50%',
            '&:focus-within': {
                width: '100%'
            },
            '&:hover': {
                backgroundColor: 'var(--cor-fundo-card-hover)'
            }
        },
        searchIcon: {
            height: '100%',
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(0, 2),
            color: theme.palette.getContrastText('#E9EAEA')
        },
        inputRoot: {
            flex: 1,
            color: theme.palette.getContrastText('#E9EAEA')
        },
        inputInput: {
            padding: theme.spacing(1, 2)
        },
        resetSearchTextButton: {
            padding: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        links: {
            width: '30%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        avatarButton: {
            padding: 0
        },
        avatar: {
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: theme.spacing(3),
            color: theme.palette.getContrastText('#E9EAEA'),
            backgroundColor: 'var(--cor-fundo-card)',
            '&:hover': {
                backgroundColor: 'var(--cor-fundo-card-hover)'
            }
        },
        linkAvatar: {
            textDecoration: 'none'
        }
    })
);

function NavBar ({ tipoLinks }: LinksNavbar) {
    const classes = useStyles();
    const history = useHistory();
    const search = useSearch();
    const elevation = tipoLinks === 'landing' ? 0 : 4;
    const toolbarVariant = tipoLinks === 'landing' ? 'regular' : 'dense';
    const toolbarPosition = tipoLinks === 'landing' ? 'absolute' : 'fixed';
    const [searchText, setSearchText] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const nome = sessionStorage.getItem('nome');
    const sobrenome = sessionStorage.getItem('sobrenome');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleLogout () {
        sessionStorage.clear();
        history.push('/');
    }

    function isInPlantoes () {
        const url = window.location.href.split('/');

        return url[url.length - 1] === 'plantoes';
    }

    function handleSearch (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        search.setDados.setLike(searchText);

        if (!isInPlantoes()) {
            history.push('plantoes');
        }
    }

    function resetSearchText () {
        search.setDados.setLike('');
        setSearchText('');
    }

    useEffect(() => {
        if (isInPlantoes()) {
            setSearchText(search.dados.like);
        }
    }, []);

    const toolbars: Record<'none' | 'landing' | 'default', JSX.Element> = {
        none: (
            <div className={classes.toolbarBlank}>
                <div className={classes.logo}>
                    <Link to="/plantoes">
                        <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                    </Link>
                </div>
            </div>
        ),
        landing: (
            <div className={classes.toolbarLanding}>
                <div className={classes.logoLinksLanding}>
                    <Link to="/plantoes">
                        <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                    </Link>
                    <LinkScroll
                        activeClass="active" to="sobrenos" spy={true} smooth={true}
                        offset={-70} duration={500}
                    >
                        <Typography variant="body1" color="textPrimary">
                            Sobre nós
                        </Typography>
                    </LinkScroll>
                    <LinkScroll
                        activeClass="active" to="contato" spy={true} smooth={true}
                        offset={-70} duration={500}
                    >
                        <Typography variant="body1" color="textPrimary">
                            Fale conosco
                        </Typography>
                    </LinkScroll>
                </div>
                <div className={classes.botoesAcesso}>
                    <Button
                        type="button"
                        texto="Login"
                        background="#E9E9EA"
                        textTransform="none"
                        size="small"
                        onClick={() => history.push('login')}
                    />
                    {/* <Button
                        type="button"
                        texto="Faça parte"
                        background="#A1E09E"
                        textTransform="none"
                        size="small"
                        onClick={() => history.push('cadastro')}
                    /> */}
                </div>
            </div>
        ),
        default: (
            <div className={classes.toolbarDefault}>
                <div className={classes.logo}>
                    <Link to="/plantoes">
                        <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                    </Link>
                </div>
                <form className={classes.pesquisa} onSubmit={handleSearch}>
                    <div className={classes.search}
                        style={searchText ? { width: '100%' } : {}}
                    >
                        <InputBase
                            placeholder="Pesquisar plantões"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            endAdornment={
                                searchText && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="limpar pesquisa"
                                            onClick={resetSearchText}
                                            className={classes.resetSearchTextButton}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        />
                        <Divider orientation="vertical" />
                        <IconButton type="submit" className={classes.searchIcon}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                </form>
                <div className={classes.links}>
                    <Link to="/perfil">
                        <Typography variant="body1" color="textPrimary">
                            Avaliações
                        </Typography>
                    </Link>
                    <Link to="/carteira">
                        <Typography variant="body1" color="textPrimary">
                            Minha carteira
                        </Typography>
                    </Link>
                    <IconButton className={classes.avatarButton} onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Avatar className={classes.avatar}>
                            {nome && nome?.charAt(0) + sobrenome?.charAt(0)}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="menu-perfil"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => history.push('perfil')}>
                            Meu Perfil
                        </MenuItem>
                        <MenuItem onClick={() => history.push('carteira')}>
                            Minha carteira
                        </MenuItem>
                        <Divider variant="middle"/>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        )
    };

    return (
        <AppBar className={classes.appBar} elevation={elevation} position={toolbarPosition}
            style={tipoLinks === 'landing' ? { background: 'transparent' } : { background: 'white' }}
        >
            <Toolbar disableGutters variant={toolbarVariant}>
                <Hidden smDown>
                    {toolbars[tipoLinks]}
                </Hidden>
                <Hidden mdUp>
                    <div className={classes.logo}>
                        <img src={LogoPlantaoFacil} alt="PlantaoFacil"/>
                    </div>
                    <IconButton onClick={handleDrawerToggle}>
                        <img src={IconeMenu} alt="Menu" />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Hidden mdUp>
                <DrawerMobile
                    open={mobileOpen}
                    tipoLinks={tipoLinks}
                    handleDrawerToggle={handleDrawerToggle}
                    abrirModalAvaliacao={() => { console.log('dsfg'); }}
                />
            </Hidden>
        </AppBar>
    );
}

export default NavBar;
