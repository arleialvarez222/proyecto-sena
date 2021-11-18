import HttpService from '../servicios/http-service';


export const obtenerInventarios = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Inventory').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}