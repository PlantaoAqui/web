import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router';
import FormCadastro from '../../components/FormCadastro';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import './styles.css';

function Cadastro () {
    const history = useHistory();
    const [etapa, setEtapa] = useState(0);
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
                status: '',
                estado: '',
                cidade: '',
                instituicaoDeEnsino: '',
                dataDeNascimento: ''
            },
            arquivo: ''
        },
        onSubmit: async () => handleSubmit.execute()
    })

    function ResetCidade(reset: boolean){
        if (reset){
            formik.setFieldValue('informacoesUsuario.cidade', '');
        }
    }

    function ProximaEtapa(e: React.ChangeEvent<HTMLFormElement>) {
        if(etapa < 3){
            setEtapa(etapa + 1)
        } else {
            formik.handleSubmit(e)
            setEtapa(0)
        }
    }

    const handleSubmit = useAsyncCallback(
        async () => {
            await api.post('/usuarios', formik.values)
            .then((response) => {
                for (var [key, value] of Object.entries(response.data)) {
                    sessionStorage.setItem(key, String(value));
                }
                history.push('/plantoes');
            }).catch(error =>{
                console.log(error);
            })
        }
    )

    return (
        <div className="page-cadastro">
            <NavBar aba={2} />
            {etapa === 0 && (
                <FormCadastro
                    titulo="Seja bem-vindo!"
                    subtitulo="Forneça alguns dados para criar a sua conta."
                    etapa={0}
                    rodape="Digite uma senha com min 6 caracteres"
                    textoBotao="Quero me cadastrar"
                    values={formik.values}
                    handleChange={formik.handleChange}
                    proximaEtapa={ProximaEtapa}
                />
            )}
            {etapa === 1 && (
                <FormCadastro
                    titulo="Como somos uma comunidade de médicos, vamos precisar de mais alguns dados..."
                    etapa={1}
                    textoBotao="Prosseguir"
                    values={formik.values}
                    handleChange={formik.handleChange}
                    proximaEtapa={ProximaEtapa}
                    resetCidade={ResetCidade}
                />
            )}
            {etapa === 2 && (
                <FormCadastro
                    titulo="Termos e Políticas Todeplantão.com"
                    etapa={2}
                    termos="1. Os serviços fornecidosNossa missão é proporcionar às pessoas o poder de criar "
                    textoBotao="Concordar e Prosseguir"
                    values={formik.values}
                    handleChange={formik.handleChange}
                    proximaEtapa={ProximaEtapa}
                />
            )}
            {etapa === 3 && (
                <FormCadastro
                    titulo="Confirmação dos documentos"
                    etapa={3}
                    textoDocumento="obrigado por ter chegado até aqui e fazer parte da nossa comunidade! Porém ainda falta um ultimo passo para que possa usufruir 100% da nossa plataforma. Precisamos que tire uma foto junto com o seu CRM, comprovando a sua identidade."
                    placeholderDocumento="Clique aqui ou arraste o seu arquivo"
                    textoBotao="Upload do arquivo"
                    values={formik.values}
                    handleChange={formik.handleChange}
                    proximaEtapa={ProximaEtapa}
                    setFotoDocumento={(url) => formik.setFieldValue('arquivo', url)}
                    setArquivoDocumento={setArquivoFotoDocumento}
                />
            )}
        </div>
    );
}

export default Cadastro;
