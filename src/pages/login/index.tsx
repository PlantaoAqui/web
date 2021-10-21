import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import * as Yup from 'yup';
import { alpha, createStyles, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MaterialUIButton from '@material-ui/core/Button';

import BolhaAzul from '../../assets/images/landing-page/azul.svg';
import BolhaVerde from '../../assets/images/landing-page/verde.svg';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            overflow: 'hidden',
            position: 'relative'
        },
        wrapper: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            background: alpha(theme.palette.grey[500], 0.4)
        },
        caixaLogin: {
            position: 'relative',
            background: theme.palette.background.default,
            width: '50rem',
            height: 'fit-content',
            padding: theme.spacing(3),
            borderRadius: '8px',
            margin: 'auto',
            '& input:first-of-type': {
                marginTop: '1.6rem'
            }
        },
        botaoVoltar: {
            position: 'absolute',
            top: theme.spacing(-10),
            textTransform: 'none',
            color: theme.palette.text.secondary,
            '&:hover': {
                background: 'transparent'
            }
        },
        copyright: {
            position: 'absolute',
            marginLeft: theme.spacing(-3),
            width: '100%',
            textAlign: 'center',
            fontWeight: 300,
            bottom: theme.spacing(-8)
        },
        background: {
            zIndex: -10
        },
        circuloVerde: {
            position: 'absolute',
            bottom: '-38vw',
            right: '-36vw',
            width: '80vw'
        },
        circuloAzul: {
            position: 'absolute',
            top: '-36vw',
            left: '-36vw',
            width: '80vw'
        }
    })
);

function Login () {
    const classes = useStyles();
    const history = useHistory();
    const [error, setError] = useState('');
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Insira um email válido').required('Preencha todos os campos'),
            senha: Yup.string().required('Preencha todos os campos')
        }),
        onSubmit: () => handleSubmit.execute()
    });

    const handleSubmit = useAsyncCallback(
        async () => {
            await api.post('/autenticar', formik.values)
                .then((response) => {
                    for (const [key, value] of Object.entries(response.data)) {
                        sessionStorage.setItem(key, String(value));
                    }
                    history.push('/plantoes');
                }).catch(error => {
                    if ([400, 401, 404].includes(error.response.status)) {
                        setError(error.response.data.message);
                    } else {
                        console.log(error.response.data);
                    }
                });
        }
    );

    useEffect(() => {
        setErro(!!error ||
            (!!formik.errors.email && !!formik.touched.email) ||
            (!!formik.errors.senha && !!formik.touched.senha));
        setMensagemErro(error ||
            (formik.touched.email && formik.errors.email) ||
            (formik.touched.senha && formik.errors.senha) || '');
    }, [error, formik.errors, formik.touched]);

    return (
        <div className={classes.root}>
            <NavBar tipoLinks="none" />
            <div className={classes.wrapper}>
                <form className={classes.caixaLogin} onSubmit={formik.handleSubmit}>
                    <MaterialUIButton
                        className={classes.botaoVoltar}
                        startIcon={<ArrowBackIcon/>}
                        onClick={() => history.push('/')}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        disableElevation
                    >
                        Voltar
                    </MaterialUIButton>
                    <Typography gutterBottom
                        variant="h4" color="textPrimary"
                    >
                        Login
                    </Typography>
                    <Typography gutterBottom
                        style={erro ? { color: 'var(--cor-vermelha-warning)' } : { color: 'var(--cor-texto-claro)' }}
                        variant="body1" color="textSecondary"
                    >
                        {mensagemErro || 'Entre na nossa comunidade de médicos'}
                    </Typography>
                    <TextInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        error={!!formik.errors.email && !!formik.touched.email}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        gutterBottom
                    />
                    <TextInput
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={formik.values.senha}
                        error={!!formik.errors.senha && !!formik.touched.senha}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        gutterBottom
                    />
                    <Button
                        background='#A1E09E'
                        type="submit"
                        texto="Entrar"
                        textTransform="none"
                        tamanhoTexto="big"
                    />
                    <Typography className={classes.copyright}
                        variant="subtitle1" color="textPrimary"
                    >
                        © Plantão Fácil 2021, Todos os direitos reservados.
                    </Typography>
                </form>
            </div>
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

export default Login;
