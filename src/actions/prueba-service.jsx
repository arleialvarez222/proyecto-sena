import HttpService from '../servicios/http-service';


export const obtenerEmpleado = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Employees').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
