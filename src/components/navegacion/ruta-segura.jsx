import React from 'react';
import { useStateValue } from '../../context/store';
import { Redirect, Route } from 'react-router-dom'

function RutaSegura({ component: Component, ...rest }) {

    const [{ sesionUsuario }, dispatch] = useStateValue();
    const state = sesionUsuario || JSON.parse(localStorage.getItem("state"));
    return (

        <Route
            {...rest}
            render = { (props) => 
                state ? (
                    state?.autenticado === true ? (
                        <Component {...props} {...rest}/>
                    ) : <Redirect to="/login" />
                ) : <Redirect to="/login" />
            }
        /> 
        
    )
}

export default RutaSegura;
