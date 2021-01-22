import axios from 'axios';

const api =  axios.create({
    baseURL: 'https://18.228.36.62/',
});

export default api;