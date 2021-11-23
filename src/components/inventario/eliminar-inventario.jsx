import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Grid, DialogContentText, DialogTitle, Icon } from '@material-ui/core';
import Style from '../../style/style';

const ConfirmarEliminarInventario = ({abrir, cerrarModal, selectInventory, deleteInventory}) => {
    return (
        <div>
            <Dialog open={abrir} aria-labelledby="form-dialog-title" className="dialogos" >
                <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" >
                    {"Estas seguro que deceas eliminar esta información"}
                </DialogTitle>
                <DialogContent>
                    <Grid container >
                        <Grid direction="row" justifyContent="center" alignItems="center" className="iconEliminar" >
                            <DialogContentText id="alert-dialog-description">
                                <Icon style={Style.iconEliminar} >error_outline</Icon>
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                    <DialogActions  className="btnDialogAction">
                        
                        <Button onClick={() => deleteInventory(selectInventory)} type="submit"  variant="contained" color="primary"> Eliminar </Button>
                                
                        <Button onClick={cerrarModal} variant="outlined" color="primary" autoFocus >
                            Cancelar
                        </Button> 
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmarEliminarInventario;
