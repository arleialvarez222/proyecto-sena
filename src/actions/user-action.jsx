
import { instancia } from '../servicios/http-service';

export const registrarUsuario = usuario => {
    return new Promise((resolve, reject) => {
        instancia.post('/accounts/Registration', usuario).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error?.response??"ocurrio un error");
        })
    });
}


export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, reject) => {
        instancia.post('/accounts/Login', usuario).then(response => {

            dispatch({
                type : "INICIAR_SESION",
                sesion : response?.data,
                autenticado : true,
                token: response?.data?.token,
            })

            resolve(response);
        }).catch(error => {
            reject(error.response);
        })
    });
}
