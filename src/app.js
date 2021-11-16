import React from 'react';
import './app.css';
import theme from './theme/theme';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Grid, Snackbar } from '@material-ui/core';
import AppNavbar from './components/navegacion/app-navbar';
import Productos from './components/productos/productos';
import Footer from './components/footer/footer';
import Registro from './components/seguridad/registro/registro';
import Login from './components/seguridad/login/login';
import Empleados from './components/empleados/empleados';
import Clientes from './components/clientes/clientes';
import Proveedor from './components/proveedor/proveedor';
import Inventario from './components/inventario/inventario';
import Pedidos from './components/pedidos/pedidos';
import Ventas from './components/ventas/ventas';
import DialogVenta from './components/ventas/agregar-venta';
import { useStateValue } from './context/store';

function App() {
  const [{ openSnackbar }, dispatch] = useStateValue();
  return (
    <React.Fragment>
      <Snackbar 
          anchorOrigin={{ vertical:'top', horizontal:'center', }}
          open={ openSnackbar ? openSnackbar.open : false }
          autoHideDuration={ 3000 }
          ContentProps={{ "aria-describedby" : "message-id" }}
          //message={  openSnackbar ? openSnackbar.mensaje : '' }
          onClose={ () => 
            dispatch({
              type: "OPEN_SNACKBAR",
                openMensaje : {
                  open: false,
                  mensaje: ""
                }
            }) 
          }
        >
        { openSnackbar ? openSnackbar.mensaje : '' }  
        </Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar/>
          <Grid container >
            <Switch>
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/" component={Productos} />
              <Route exact path="/empleados" component={Empleados} />
              <Route exact path="/clientes" component={Clientes} />
              <Route exact path="/proveedor" component={Proveedor} />
              <Route exact path="/inventario" component={Inventario} />
              <Route exact path="/pedidos" component={Pedidos} />
              <Route exact path="/ventas" component={Ventas} />
              <Route exact path="/nuevaVenta" component={DialogVenta} />
              <Route exact path="/registro" component={Registro} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Grid>
          <Footer/>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
