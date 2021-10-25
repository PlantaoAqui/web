import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router';
import api from '../../services/api';
import * as Yup from 'yup';
import FormOverlay from '../../components/FormOverlay';
import Typography from '@material-ui/core/Typography';
import Button from '../../components/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../components/TextInput';

import CheckIcon from '../../assets/images/icones/check.svg';
import FormUsuario from './components/FormUsuario';
import FormInfo from './components/FormInfo';
import Termos from './components/Termos';

const mensagemCampoObrigatorio = 'Preencha todos os campos';

const validationSchema = [
    Yup.object({
        usuario: Yup.object({
            nome: Yup.string().required(mensagemCampoObrigatorio),
            sobrenome: Yup.string().required(mensagemCampoObrigatorio),
            email: Yup.string().email('O email inserido não é válido').required(mensagemCampoObrigatorio),
            telefone: Yup.string().required(mensagemCampoObrigatorio),
            senha: Yup.string().required(mensagemCampoObrigatorio)
                .min(6, 'A senha deve ter pelo menos 6 caracteres').test(
                    'senhas-iguais',
                    'As senhas não correspondem',
                    (value, context) => value === context.parent.repetirSenha
                ),
            repetirSenha: Yup.string().required(mensagemCampoObrigatorio)
                .min(6, 'A senha deve ter pelo menos 6 caracteres').test(
                    'senhas-iguais',
                    'As senhas não correspondem',
                    (value, context) => value === context.parent.senha
                )
        })
    }),
    Yup.object({
        informacoesUsuario: Yup.object({
            crm: Yup.string().required(mensagemCampoObrigatorio),
            grauDeFormacao: Yup.number().positive(mensagemCampoObrigatorio).required(mensagemCampoObrigatorio),
            uf: Yup.number().positive(mensagemCampoObrigatorio).required(mensagemCampoObrigatorio),
            municipio: Yup.number().positive(mensagemCampoObrigatorio).required(mensagemCampoObrigatorio),
            instituicaoDeEnsino: Yup.string().required(mensagemCampoObrigatorio),
            dataDeNascimento: Yup.string().required(mensagemCampoObrigatorio)
        })
    }),
    Yup.object()
    // Yup.object({
    //     arquivo: Yup.string().required('O arquivo com o documento é obrigatório.')
    // })
];

const useStyles = makeStyles(theme =>
    createStyles({
        inicio: {
            '& button:first-of-type': {
                marginTop: theme.spacing(4)
            }
        },
        camposInscricao: {
            marginTop: '1.6rem'
        },
        erroInscricao: {
            color: theme.palette.error.main
        },
        inscricaoConcluida: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& h4': {
                width: '100%'
            },
            '& img': {
                margin: '2rem auto'
            }
        }
    })
);

function Cadastro() {
    const history = useHistory();
    const classes = useStyles();
    const [tipoCadastro, setTipoCadastro] = useState<'inscricao' | 'cadastro' | undefined>();
    const [inscricaoConcluida, setInscricaoConcluida] = useState(false);
    const [temErroInscricao, setTemErroInscricao] = useState(false);
    const [mensagemErroInscricao, setMensagemErroInscricao] = useState('');
    const [etapaAtual, setEtapaAtual] = useState(0);
    // const [arquivoFotoDocumento, setArquivoFotoDocumento] = useState<File>();
    const formik = useFormik({
        initialValues: {
            usuario: {
                nome: '',
                sobrenome: '',
                email: '',
                senha: '',
                repetirSenha: '',
                telefone: ''
            },
            informacoesUsuario: {
                crm: '',
                grauDeFormacao: 0,
                uf: 0,
                municipio: 0,
                instituicaoDeEnsino: '',
                dataDeNascimento: ''
            }
        },
        validationSchema: validationSchema[etapaAtual],
        onSubmit: (_, actions) => {
            if (etapaAtual >= 2) {
                submitForm.execute();
            } else {
                setEtapaAtual(etapaAtual + 1);
                actions.setTouched({});
                actions.setSubmitting(false);
            }
        }
    });

    const formikInscricao = useFormik({
        initialValues: {
            nome: '',
            sobrenome: '',
            email: ''
        },
        validationSchema: Yup.object({
            nome: Yup.string().required(mensagemCampoObrigatorio),
            sobrenome: Yup.string().required(mensagemCampoObrigatorio),
            email: Yup.string().email('O email inserido não é válido').required(mensagemCampoObrigatorio)
        }),
        onSubmit: () => {
            submitInscricao.execute();
        }
    });

    useEffect(() => {
        setTemErroInscricao(
            (!!formikInscricao.errors.nome && !!formikInscricao.touched.nome) ||
            (!!formikInscricao.errors.sobrenome && !!formikInscricao.touched.sobrenome) ||
            (!!formikInscricao.errors.email && !!formikInscricao.touched.email));
        setMensagemErroInscricao(
            (formikInscricao.touched.nome && formikInscricao.errors.nome) ||
            (formikInscricao.touched.sobrenome && formikInscricao.errors.sobrenome) ||
            (formikInscricao.touched.email && formikInscricao.errors.email) || '');
    }, [formikInscricao.errors, formikInscricao.touched]);

    function handleVoltar() {
        if (tipoCadastro === 'inscricao') {
            if (inscricaoConcluida) history.push('/');
            else {
                setTipoCadastro(undefined);
                formikInscricao.resetForm();
            }
        } else if (tipoCadastro === 'cadastro') {
            if (etapaAtual === 0) {
                setTipoCadastro(undefined);
                formik.resetForm();
            } else {
                setEtapaAtual(etapaAtual - 1);
            }
        } else {
            history.push('/');
        }
    }

    function ResetCidade(reset: boolean) {
        if (reset) {
            formik.setFieldValue('informacoesUsuario.municipio', '');
        }
    }

    const submitForm = useAsyncCallback(
        async () => {
            const formData = new FormData();
            // arquivoFotoDocumento && formData.append('confirmacaoCadastro', arquivoFotoDocumento);
            formData.append('dados', JSON.stringify(formik.values));
            await api.post('/usuarios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                for (const [key, value] of Object.entries(response.data)) {
                    sessionStorage.setItem(key, String(value));
                }
                history.push('/plantoes');
            }).catch(error => {
                console.log(error);
            });
        }
    );

    const submitInscricao = useAsyncCallback(
        async () => {
            await api.post('/usuarios', formikInscricao.values)
                .then((response) => {
                    if (response.status === 201) {
                        setInscricaoConcluida(true);
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    );

    useEffect(() => {
        sessionStorage.clear();
        setTipoCadastro(undefined);
    }, []);

    function etapaForm() {
        switch (etapaAtual) {
        case 0:
            return (
                <FormUsuario
                    values={formik.values.usuario}
                    errors={formik.errors.usuario}
                    touched={formik.touched.usuario}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    handleSubmit={formik.handleSubmit}
                />
            );
        case 1:
            return (
                <FormInfo
                    values={formik.values.informacoesUsuario}
                    errors={formik.errors.informacoesUsuario}
                    touched={formik.touched.informacoesUsuario}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    handleSubmit={formik.handleSubmit}
                    resetCidade={ResetCidade}
                />
            );
        case 2:
            return (
                <Termos
                    handleSubmit={formik.handleSubmit}
                />
            );
        }
    }

    return (
        <FormOverlay
            voltar={handleVoltar}
        >
            {tipoCadastro === undefined && (
                <div className={classes.inicio}>
                    <Typography gutterBottom
                        variant="h4" color="textPrimary"
                    >
                        Olá, vamos fazer o seu cadastro
                    </Typography>
                    <Typography gutterBottom
                        variant="body1" color="textSecondary"
                    >
                        Primeiramente precisamos saber se você já tem ou não o seu CRM
                    </Typography>
                    <Button
                        background='#7BB2ED'
                        type="button"
                        texto="Já tenho CRM"
                        textTransform="none"
                        onClick={() => setTipoCadastro('cadastro')}
                        gutterBottom
                    />
                    <Button
                        background='#A1E09E'
                        type="button"
                        texto="Ainda não tenho CRM"
                        textTransform="none"
                        onClick={() => setTipoCadastro('inscricao')}
                    />
                </div>
            )}
            {tipoCadastro === 'inscricao' && (
                inscricaoConcluida
                    ? (
                        <div className={classes.inscricaoConcluida}>
                            <Typography gutterBottom
                                variant="h4" color="textPrimary"
                            >
                                Email enviado com sucesso!
                            </Typography>
                            <img src={CheckIcon} alt="Inscricao concluída" />
                        </div>
                    )
                    : (
                        <div>
                            <Typography gutterBottom
                                variant="h4" color="textPrimary"
                            >
                                Obrigado por demontrar interesse na nossa plataforma!
                            </Typography>
                            <Typography gutterBottom
                                variant="body1" color="textSecondary"
                            >
                                Iremos te enviar um email com o link de cadastro promocional
                                para você se cadastrar quando receber seu CRM.
                            </Typography>
                            <form className={classes.camposInscricao} onSubmit={formikInscricao.handleSubmit}>
                                {temErroInscricao && (
                                    <Typography gutterBottom className={classes.erroInscricao}
                                        variant="body1" color="textSecondary"
                                    >
                                        {mensagemErroInscricao}
                                    </Typography>
                                )}
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <TextInput
                                            type="nome"
                                            name="nome"
                                            placeholder="Nome"
                                            value={formikInscricao.values.nome}
                                            error={!!formikInscricao.errors.nome && !!formikInscricao.touched.nome}
                                            handleChange={formikInscricao.handleChange}
                                            handleBlur={formikInscricao.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextInput
                                            type="sobrenome"
                                            name="sobrenome"
                                            placeholder="Sobrenome"
                                            value={formikInscricao.values.sobrenome}
                                            error={!!formikInscricao.errors.sobrenome && !!formikInscricao.touched.sobrenome}
                                            handleChange={formikInscricao.handleChange}
                                            handleBlur={formikInscricao.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInput
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formikInscricao.values.email}
                                            error={!!formikInscricao.errors.email && !!formikInscricao.touched.email}
                                            handleChange={formikInscricao.handleChange}
                                            handleBlur={formikInscricao.handleBlur}
                                            gutterBottom
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    background='#A1E09E'
                                    type="submit"
                                    texto="Receber o link promocional"
                                    textTransform="none"
                                />
                            </form>
                        </div>
                    )
            )}
            {tipoCadastro === 'cadastro' && etapaForm()}
        </FormOverlay>
    );
}

export default Cadastro;
