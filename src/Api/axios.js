import realAxios from 'axios'

const axios = realAxios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log({ status: false, data: error?.response?.data?.error });
});

export default axios;