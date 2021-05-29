import axios from 'axios';
import history from '../services/history';

const api = axios.create({
    baseURL: 'https://api.plantaofacil.com'
});

api.interceptors.request.use(
    async config => {
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if ((error.response.status === 401 || error.response.status === 404) &&
            originalRequest.url === '/autenticar/atualizar-token') {
            sessionStorage.clear();
            history.push('/');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem('refreshToken');
            return await api.post('/autenticar/atualizar-token', {
                refreshToken: refreshToken
            })
                .then(response => {
                    if (response.status === 201) {
                        const accessToken = response.data.accessToken;
                        sessionStorage.setItem('accessToken', accessToken);
                        api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                        originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                        return axios(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default api;
