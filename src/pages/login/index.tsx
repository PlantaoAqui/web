import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router-dom';
import FormLogin from '../../components/FormLogin';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import * as Yup from 'yup'

function Login () {
    const history = useHistory();
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Preencha os campos obrigatórios'),
            senha: Yup.string().required('Preencha os campos obrigatórios')
          }),
        onSubmit: () => handleSubmit.execute()
    })

    const handleSubmit = useAsyncCallback(
        async () => {
            await api.post('/autenticar', formik.values)
            .then((response) => {
                for (var [key, value] of Object.entries(response.data)) {
                    sessionStorage.setItem(key, String(value));
                }
                history.push('/plantoes');
            }).catch(error =>{
                if ([400, 401, 404].includes(error.response.status)) {
                    setError(error.response.data.message);
                } else {
                    console.log(error.response.data);
                }
            })
        }
    )

    return (
        <div className="page-login">
            <NavBar aba={1} />
            <FormLogin
                titulo="Login"
                subtitulo="Entre na nossa comunidade de médicos"
                mensagemErro={error}
                textoBotao="Login"
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                handleSubmit={formik.handleSubmit}
            />
        </div>
    );
}

export default Login;
