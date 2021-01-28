import axios from 'axios';

const api =  axios.create({
    baseURL: 'https://18.229.76.91/',
});

export default api;