import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router';
import FormCadastro from '../../components/FormCadastro';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import * as Yup from 'yup'
import './styles.css';
import { Button, CircularProgress } from '@material-ui/core';
import TextInput from '../../components/TextInput';

const mensagemCampoObrigatorio = 'Preencha os campos obrigatórios';

const validationSchema = [
    Yup.object({
        usuario: Yup.object({
            nome: Yup.string().required(mensagemCampoObrigatorio),
            sobrenome: Yup.string().required(mensagemCampoObrigatorio),
            email: Yup.string().email('O email inserido não é válido').required(mensagemCampoObrigatorio),
            senha: Yup.string().required(mensagemCampoObrigatorio)
                .min(6, 'A senha deve ter pelo menos 6 caracteres')
        })
    }),
    Yup.object({
        informacoesUsuario: Yup.object({
            crm: Yup.string().required(mensagemCampoObrigatorio),
            status: Yup.number().positive(mensagemCampoObrigatorio).required(mensagemCampoObrigatorio),
            estado: Yup.string().required(mensagemCampoObrigatorio),
            cidade: Yup.string().required(mensagemCampoObrigatorio),
            instituicaoDeEnsino: Yup.string().required(mensagemCampoObrigatorio),
            dataDeNascimento: Yup.string().required(mensagemCampoObrigatorio)
        })
    }),
    Yup.object({
        arquivo: Yup.string().required('O arquivo com o documento é obrigatório.')
    })
]

function Cadastro () {
    const history = useHistory();
    const [etapaAtual, setEtapaAtual] = useState(0);
    const [arquivoFotoDocumento, setArquivoFotoDocumento] = useState<File>();
    const formik = useFormik({
        initialValues: {
            usuario: {
                nome: '',
                sobrenome: '',
                email: '',
                senha: '',
            },
            informacoesUsuario: {
                crm: '',
                status: 0,
                estado: '',
                cidade: '',
                instituicaoDeEnsino: '',
                dataDeNascimento: ''
            },
            arquivo: ''
        },
        validationSchema: validationSchema[etapaAtual],
        onSubmit: (values, actions) => {
            if (etapaAtual >= 2) {
                submitForm.execute();
            } else {
                setEtapaAtual(etapaAtual + 1);
                actions.setTouched({});
                actions.setSubmitting(false);
            }
        }
    })

    function ResetCidade(reset: boolean){
        if (reset){
            formik.setFieldValue('informacoesUsuario.cidade', '');
        }
    }

    const submitForm = useAsyncCallback(
        async () => {
            if (arquivoFotoDocumento) {
                const formData = new FormData();
                formData.append("confirmacaoCadastro", arquivoFotoDocumento)
                formData.append('dados', JSON.stringify(formik.values));
                await api.post('/usuarios', formData, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then((response) => {
                    for (var [key, value] of Object.entries(response.data)) {
                        sessionStorage.setItem(key, String(value));
                    }
                    history.push('/plantoes');
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    )

    function etapaForm () {
        switch (etapaAtual) {
            case 0:
            default:
                return(
                    <FormCadastro
                        titulo="Seja bem-vindo!"
                        subtitulo="Forneça alguns dados para criar a sua conta."
                        etapa={etapaAtual}
                        rodape="Digite uma senha com min 6 caracteres"
                        textoBotao="Quero me cadastrar"
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleSubmit={formik.handleSubmit}
                    />
                );
            case 1:
                return(
                    <FormCadastro
                        titulo="Como somos uma comunidade de médicos, vamos precisar de mais alguns dados..."
                        etapa={etapaAtual}
                        textoBotao="Prosseguir"
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleSubmit={formik.handleSubmit}
                        resetCidade={ResetCidade}
                    />
                );
            case 2:
                return(
                    <FormCadastro
                        titulo="Confirmação dos documentos"
                        etapa={etapaAtual}
                        textoBotao="Upload do arquivo"
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleSubmit={formik.handleSubmit}
                        setFotoDocumento={(url) => formik.setFieldValue('arquivo', url)}
                        setArquivoDocumento={setArquivoFotoDocumento}
                    />
                );
            case 5:
                return(
                    <FormCadastro
                        titulo="Termos e Políticas Todeplantão.com"
                        etapa={etapaAtual}
                        termos="1. Os serviços fornecidosNossa missão é proporcionar às pessoas o poder de criar "
                        textoBotao="Concordar e Prosseguir"
                        values={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleSubmit={formik.handleSubmit}
                    />
                );
        }
    }

    return (
        <div className="page-cadastro">
            <NavBar aba={2}/>
            {etapaForm()}
        </div>
    );
}

export default Cadastro;
