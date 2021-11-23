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

export const guardarInventarios = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.post('/Inventory', formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

export const editarInventarios = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.put(`/Inventory/${formulario?.idInventario}`, formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

export const eliminarInventarios = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.delete(`/Inventory/${formulario?.idInventario}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}