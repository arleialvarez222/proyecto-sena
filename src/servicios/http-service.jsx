import axios from 'axios';

//axios.defaults.baseURL= 'https://localhost:44386/api';
axios.defaults.baseURL= 'https://localhost:44386/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = 'Bearer ' + token;
        return config;
    } 
    },
    error => {
        return Promise.reject(error);
    }  
); 

export const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;
instancia.defaults.timeout = 2500;

instancia.interceptors.response.use(response => {
    new Promise((resolve) => {
        resolve(response?.data?.token);
        window.localStorage.setItem("token", response?.data?.token);
    })
})

const requestGenerico = {
    get : (url) => axios.get(url),
    post : (url, body) => axios.post(url, body),
    put : (url, body) => axios.put(url, body),
    delete : (url) => axios.delete(url),
};

export default requestGenerico;