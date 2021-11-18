import HttpService from '../servicios/http-service';


export const obtenerProveedores = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Supplier').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const guardarProveedor = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.post('/Supplier', formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

export const editarProveedor = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.put(`/Supplier/${formulario?.idProveedor}`, formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const eliminarProveedor = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.delete(`/Supplier/${formulario?.idProveedor}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

