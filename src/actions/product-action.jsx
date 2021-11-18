import HttpService from '../servicios/http-service';


export const obtenerProductos = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Products').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}