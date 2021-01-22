import axios from 'axios';

const api =  axios.create({
    baseURL: 'https://172.31.11.200/',
});

export default api;