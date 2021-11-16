import { saveState, loadState } from '../../helpers/localStorage';
export const initialState = loadState() || {
    usuario: {
        firstName       : '',
        lastName        : '',
        email           : '',
        userName        : '',
        password        : '',
        confirmPassword : ''
    },
    autenticado: false,
};

const sesionUsuarioReducer = (state = initialState, action) => {
    
    if(action?.type === "INICIAR_SESION" || action?.type ===  "SALIR_SESION"){
        saveState({ ...state,  ...action?.sesion, autenticado: action?.autenticado })
    }
    
    switch (action?.type) {
        case "INICIAR_SESION":
            return {
                ...state,
                usuario: {...action?.sesion},
                autenticado: action?.autenticado,
                token: action?.token,
            };
        case "SALIR_SESION":
            return {
                ...state,
                usuario: action?.nuevoUsuario,
                autenticado: action?.autenticado,
            };
       
        default:
            return state;
    }
};

export default sesionUsuarioReducer;