import axios from 'axios';

const api =  axios.create({
    baseURL: '18.230.116.36:3333/',
});

export default api;