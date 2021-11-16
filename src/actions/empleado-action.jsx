import HttpService from '../servicios/http-service';


export const obtenerEmpleado = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Employe').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const guardarEmpleado = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.post('/Employe', formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const editarEmpleado = () => {
    return new Promise((resolve, reject) => {
        HttpService.put('/Employe').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const eliminarEmpleado = () => {
    return new Promise((resolve, reject) => {
        HttpService.delete('/Employe').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

