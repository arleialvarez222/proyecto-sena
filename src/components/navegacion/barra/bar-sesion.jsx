import React, {useState} from 'react';
import { IconButton, makeStyles, Toolbar, Grid, Drawer } from '@material-ui/core';
import Style from '../../../style/style';
import logo3  from '../../../imagenes/logo3.jpeg';
import MenuIzquierda from './menu-izquierda';
import { useStateValue } from '../../../context/store';
import MenuDerecha from './menu-derecha';
import { withRouter } from 'react-router-dom';

const useStyle = makeStyles ((theme) => ({
    seccionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    grow: {
      flexGrow: 1,
    },
    list: {
      width: 200,
      height: 625,
      backgroundColor: "#0039cb",
      color: "#ffffff"
    },
    listItemText: {
      fontSize: "14px",
      fontWeight: 600,
      paddingLeft: "15px",
      color: "#292424",
    },
  }));

const BarSesion = (props) => {
  
  const classe = useStyle();
  const [menuIzquierda, setMenuIzquierda] = useState(false); 
  const [menuDerecha, setMenuDerecha] = useState(false); 
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const abrirMenuAction = () => {
    setMenuIzquierda(true);
  }

  const cerrarMenu = () => {
    setMenuIzquierda(false);
  }
  
  const abrirMenuD = () => {
    setMenuDerecha(true);
  }

  const cerrarMenuDerecha = () => {
    setMenuDerecha(false);
} 

  const salirSesion = () => {
    dispatch({
      type : "SALIR_SESION",
      nuevoUsuario:  null,
      autenticado : false
    }) 
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    props.history.push("/login"); 
  }

  return (
      <>
        <Drawer open = {menuIzquierda} onClose = {cerrarMenu} anchor="left" variant="temporary" >
            <div className={classe.list} onKeyDown={cerrarMenu} onClick={cerrarMenu} >
                <MenuIzquierda classe={classe} />
            </div>
        </Drawer>
        <Drawer open = {menuDerecha} onClose = {cerrarMenuDerecha} anchor="right" >
              <div className={classe.list} onKeyDown={cerrarMenuDerecha} onClick={cerrarMenuDerecha}>
                  <MenuDerecha 
                    classe={classe}
                    salirSesion={salirSesion}
                  />
              </div>
          </Drawer>
        <Toolbar>
            <IconButton color="inherit" onClick={abrirMenuAction} style={Style.iconMenu} >
                <i className="material-icons" >menu</i>
            </IconButton>

            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid className="divLogo" >
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item md={3}>
                    <img src={logo3} alt="Imagen 1" className="logo" />
                  </Grid>
          
                </Grid>
              </Grid>
            
              <div className={classe.grow} ></div>
              
              <div>
              <IconButton color="inherit" onClick={abrirMenuD} >
                    <i className="material-icons" >exit_to_app</i>
                </IconButton>
              </div>
            </Grid>
        </Toolbar>
      </>
  )
}

export default withRouter(BarSesion);
