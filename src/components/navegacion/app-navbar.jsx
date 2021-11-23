import React from 'react'
import { AppBar } from '@material-ui/core'
import BarSesion from './barra/bar-sesion'
import { useStateValue } from '../../context/store'

const AppNavbar = () => {

    const [{ sesionUsuario }, dispatch] = useStateValue();
    const state = sesionUsuario || JSON.parse(localStorage.getItem("state"));

    return  state
        ? (state.autenticado === true ?  <AppBar position="sticky" ><BarSesion /> </AppBar> : null )
        : null
}

export default AppNavbar;
