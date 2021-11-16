import sesionUsuarioReducer from './sesion-usuario-reducer';
import openSnackbarReducer from './open-snackbar-reducer';


export const mainReducer = ({ sesionUsuario, openSnackbar, actCreditoReducer }, action ) => {
    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
        openSnackbar: openSnackbarReducer(openSnackbar, action),
    }
}