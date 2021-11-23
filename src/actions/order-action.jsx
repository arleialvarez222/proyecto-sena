import HttpService from '../servicios/http-service';

export const obtenerPedido = () => {
    return new Promise((resolve, reject) => {
        HttpService.get(`/Order`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const guardarPedido = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.post(`/Order`, formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const editarPedido = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.put(`/Order/${formulario?.idPedido}`, formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const eliminarPedido = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.delete(`/Order/${formulario?.idPedido}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}