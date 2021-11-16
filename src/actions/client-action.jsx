import HttpService from '../servicios/http-service';

export const getClients = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Clients').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}