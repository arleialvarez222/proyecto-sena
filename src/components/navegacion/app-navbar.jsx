import React from 'react'
import { AppBar } from '@material-ui/core'
import BarSesion from './barra/bar-sesion'

const AppNavbar = () => {
    return (
        <AppBar position="sticky" >
            <BarSesion />
        </AppBar>
    )
}

export default AppNavbar;