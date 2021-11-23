import React from 'react';
import { List, ListItem, ListItemText} from '@material-ui/core';
import Style from '../../../style/style';

const MenuDerecha = ({classe, salirSesion}) => {
    return (
        <div className={classe.list}  >
            <List>
                <ListItem  button  onClick={salirSesion} style={Style.cerrarsesion}>
                    <i className = "material-icons" style={Style.iconDrawer} >exit_to_app</i>
                    <ListItemText classe={{primary: classe.listItemText}} primary="Cerrar sesión" />
                </ListItem>
            </List>
           
        </div>
    )
}

export default MenuDerecha;
