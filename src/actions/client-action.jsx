import HttpService from '../servicios/http-service';


export const obtenerClientes = () => {
    return new Promise((resolve, reject) => {
        HttpService.get('/Clients').then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const guardarCliente = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.post('/Clients', formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

export const editarCliente = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.put(`/Clients/${formulario?.idCliente}`, formulario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}
export const eliminarCliente = (formulario) => {
    return new Promise((resolve, reject) => {
        HttpService.delete(`/Clients/${formulario?.idCliente}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    })
}

export const buscarCliente = (busqueda) => {
    return new Promise((resolve, reject) => {
        HttpService.get(`/Clients?Documento=${busqueda}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}

