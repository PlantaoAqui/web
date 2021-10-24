import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import * as Yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import FormOverlay from '../../components/FormOverlay';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        conteudo: {
            '& input:first-of-type': {
                marginTop: '1.6rem'
            }
        }
    })
);

function Login() {
    const history = useHistory();
    const classes = useStyles();
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

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    return (
        <FormOverlay
            voltar={() => history.push('/')}
        >
            <div className={classes.conteudo}>
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
            </div>
        </FormOverlay>
    );
}

export default Login;
