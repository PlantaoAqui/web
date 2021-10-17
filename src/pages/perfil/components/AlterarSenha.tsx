import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import CardTitulo from '../../../components/CardTitulo';
import TextInput from '../../../components/TextInput';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { useAsyncCallback } from 'react-async-hook';
import api from '../../../services/api';

interface AlterarSenhaProps {
    close: () => void;
}

const useStyles = makeStyles(theme =>
    createStyles({
        textoErro: {
            color: theme.palette.error.main,
            padding: theme.spacing(0, 3)
        },
        condicoesSenha: {
            margin: theme.spacing(8)
        },
        spacer: {
            height: theme.spacing(3)
        }
    })
);

function AlterarSenha ({ close }: AlterarSenhaProps) {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState('');

    const submeterAlteracoes = useAsyncCallback(
        async () => {
            await api.patch('/autenticar', formik.values)
                .then(() => close())
                .catch(error => {
                    if (error.response.status === 401) {
                        setErrorMessage('Senha inválida');
                    } else {
                        console.log(error.response.data);
                    }
                });
        }
    );

    const formik = useFormik({
        initialValues: {
            senhaAtual: '',
            novaSenha: '',
            novaSenhaRepeticao: ''
        },
        validationSchema: Yup.object({
            senhaAtual: Yup.string().required('Preencha todos os campos'),
            novaSenha: Yup.string().required('Preencha todos os campos')
                .min(6, 'Mínimo de 6 caracteres').test(
                    'senhas-iguais',
                    'As senhas não correspondem',
                    (value, context) => value === context.parent.novaSenhaRepeticao
                ),
            novaSenhaRepeticao: Yup.string().required('Preencha todos os campos')
                .min(6, 'Mínimo de 6 caracteres').test(
                    'senhas-iguais',
                    'As senhas não correspondem',
                    (value, context) => value === context.parent.novaSenha
                )
        }),
        onSubmit: () => submeterAlteracoes.execute()
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid item style={{ padding: '0.6rem' }}>
                <CardTitulo
                    titulo="Alterar senha"
                    transparent
                >
                    <Grid container spacing={3}>
                        <Grid container direction="column"xs={6} item>
                            <Grid item>
                                <ListItemText
                                    primary="Senha atual"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary',
                                        style: {
                                            marginBottom: '0.8rem'
                                        }
                                    }}
                                    secondary={
                                        <TextInput
                                            name="senhaAtual"
                                            type="password"
                                            value={formik.values.senhaAtual}
                                            error={!!formik.errors.senhaAtual && !!formik.touched.senhaAtual}
                                            placeholder="Digite sua senha"
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <ListItemText
                                    primary="Nova senha"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary',
                                        style: {
                                            marginBottom: '0.8rem'
                                        }
                                    }}
                                    secondary={
                                        <TextInput
                                            name="novaSenha"
                                            type="password"
                                            value={formik.values.novaSenha}
                                            error={!!formik.errors.novaSenha && !!formik.touched.novaSenha}
                                            placeholder="Digite a sua nova senha"
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <ListItemText
                                    primary=""
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary',
                                        style: {
                                            marginBottom: '0.8rem'
                                        }
                                    }}
                                    secondary={
                                        <TextInput
                                            name="novaSenhaRepeticao"
                                            type="password"
                                            value={formik.values.novaSenhaRepeticao}
                                            error={!!formik.errors.novaSenhaRepeticao && !!formik.touched.novaSenhaRepeticao}
                                            placeholder="Confirme a sua nova senha"
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="textPrimary"
                                    className={classes.textoErro}
                                >
                                    {errorMessage ||
                                    (formik.touched.senhaAtual && formik.errors.senhaAtual) ||
                                    (formik.touched.novaSenha && formik.errors.novaSenha) ||
                                    (formik.touched.novaSenhaRepeticao && formik.errors.novaSenhaRepeticao)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textPrimary"
                                className={classes.condicoesSenha}
                            >
                                Condições da nova senha: <br/> <br/>
                                • Mínimo de 6 caracteres <br/>
                                • Uso de letras e números <br /> <br/>
                                O uso de senhas fortes é importante para a segurança dos seus dados.
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.spacer}/>
                    <Button
                        texto="Atualizar senha"
                        type="submit"
                        background="#A1E09E"
                    />
                </CardTitulo>
            </Grid>
        </form>
    );
}

export default AlterarSenha;
