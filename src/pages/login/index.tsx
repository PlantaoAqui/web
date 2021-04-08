import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useAsyncCallback } from 'react-async-hook';
import { useHistory } from 'react-router-dom';
import FormLogin from '../../components/FormLogin';
import NavBar from '../../components/NavBar';
import api from '../../services/api';

function Login () {
    const history = useHistory();
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
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
                if (error.response.status === 401) {
                    setError(error.response.data.error);
                    console.log(error.response.data.error);
                } else {
                    console.log(error.response);
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
                rodape={error}
                textoBotao="Login"
                values={formik.values}
                handleChange={formik.handleChange}
                handleSubmit={formik.handleSubmit}
            />
        </div>
    );
}

export default Login;
