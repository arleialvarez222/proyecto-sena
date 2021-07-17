import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Style from '../../../style/style';

const MenuIzquierda = ({classe}) => {
    return (
        <div className={classe.list} >
        <List>
            <ListItem component={Link} button to="/nuevaVenta" >
                <i className = "material-icons" style={Style.iconDrawer} >add_circle</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Agregar Venta" />
            </ListItem>
            <ListItem component={Link} button to="/ventas" >
                <i className = "material-icons" style={Style.iconDrawer} >today</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Ventas" />
            </ListItem>
            <ListItem component={Link} button to="/clientes" >
                <i className = "material-icons" style={Style.iconDrawer} >people_alt</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Clientes" />
            </ListItem>
            <ListItem component={Link} button to="/productos" >
                <i className = "material-icons" style={Style.iconDrawer} >list</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Productos" />
            </ListItem>
            <ListItem component={Link} button to="/empleados" >
                <i className = "material-icons" style={Style.iconDrawer} >person</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Empleados" />
            </ListItem>
            <ListItem component={Link} button to="/proveedor" >
                <i className = "material-icons" style={Style.iconDrawer} >assignment_ind</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Proveedor" />
            </ListItem>
            <ListItem component={Link} button to="/inventario" >
                <i className = "material-icons" style={Style.iconDrawer} >list_alt</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Inventario" />
            </ListItem>
            <ListItem component={Link} button to="/pedidos" >
                <i className = "material-icons" style={Style.iconDrawer} >redeem</i>
                <ListItemText classe={{primary: classe.listItemText}} primary="Pedidos" />
            </ListItem>
            
        </List>
    </div>
    )
}

export default MenuIzquierda;
