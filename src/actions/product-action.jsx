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
export const guardarProducto = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.post('/Products', formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const editarProducto = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.put(`/Products/${formulario?.idProducto}`, formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const eliminarProducto = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.delete(`/Products/${formulario?.idProducto}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}