import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, DialogContentText, Icon, TableContainer, Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Style from '../../style/style';

const DetalleVenta = ({abrirDetalle, cerrarDetalle, idVenta}) => {
    return (
        <div>
            <Dialog open={abrirDetalle} aria-labelledby="form-dialog-title" className="dialogos" >
                <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" >
                    <Icon style={Style.iconBoton} >list</Icon>{"Detalles de la venta"}
                </DialogTitle>
                <DialogContent>
                <Grid container>
                    <TableContainer >
                        <Table style={Style.tabla} size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" > Nombre producto </TableCell>
                                    <TableCell align="left" > Cantidad </TableCell>
                                    <TableCell align="left" > Valor unidad </TableCell>
                                    <TableCell align="left" > Valor total </TableCell>
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={idVenta?.idEmployee}>
                                    <TableCell align="left" > {idVenta?.idEmployee} </TableCell>
                                    <TableCell align="left" > {idVenta?.names} </TableCell>
                                    <TableCell align="left" > {idVenta?.lastNames} </TableCell>
                                    <TableCell align="left" > {idVenta?.email} </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                </Grid>
                </DialogContent>
                    <DialogActions  className="btnDialogAction">
                                
                        <Button onClick={cerrarDetalle} variant="outlined" color="primary" autoFocus >
                            Cancelar
                        </Button> 
                        
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default DetalleVenta;
