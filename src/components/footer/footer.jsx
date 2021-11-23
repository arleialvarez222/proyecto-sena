import React from 'react'
import { useStateValue } from '../../context/store';
import AppFooter  from './app-footer';

const Footer = () => {

    const [{ sesionUsuario }, dispatch] = useStateValue();
    const state = sesionUsuario || JSON.parse(localStorage.getItem("state"));

    return state
    ? (state.autenticado === true ?  <AppFooter/> : null )
    : null
}

export default Footer;
