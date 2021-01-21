import axios from 'axios';

const api =  axios.create({
    baseURL: 'https://ip-172-31-11-200.sa-east-1.compute.internal/',
});

export default api;