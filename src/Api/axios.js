import realAxios from 'axios'
import Cookies from 'js-cookie';

const axios = realAxios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

axios.interceptors.request.use((config) => {
    const token = Cookies.get('auth');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    const lang = localStorage.getItem('language') || 'en';
    if (lang) config.headers['Content-Language'] = lang;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    if(error?.response?.data?.message) return error?.response?.data
    else console.warn({ status: false, data: error });
});

export default axios;