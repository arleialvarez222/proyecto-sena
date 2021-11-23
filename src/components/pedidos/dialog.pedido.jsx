import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Icon, Grid, TextField,  } from '@material-ui/core';
import Style from '../../style/style';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '28ch', 
      },
    },
}));

function DialogPedido({ isOpen, onClose, formulario, modoEdicion, cliente, empleado }) {
    const classes = useStyles();

    return (
        <div >
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" className="dialogos" >
                {
                    modoEdicion ? (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" >
                            <Icon style={Style.iconBoton} >edit</Icon>{"Editar pedido"}
                        </DialogTitle>
                    ) : (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >add_circle_outlined</Icon>{"Agregar pedido"}
                        </DialogTitle>
                    )
                }
                <DialogContent>
                    <form className={classes.root} onSubmit={formulario?.handleSubmit} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="idCliente" 
                                    value={formulario?.values?.idCliente} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Ingresar cliente *"
                                    error={formulario.touched.idCliente && Boolean(formulario.errors.idCliente)} 
                                    helperText={formulario.touched.idCliente && formulario.errors.idCliente} 
                                >
                                    {
                                        cliente?.map(resp => (
                                            <MenuItem key={resp?.idCliente} value={resp?.idCliente}>{resp?.nombres} {resp?.apellidos}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="date"
                                    name="fechaVentaPedido" 
                                    format="dd/mm/yyyy"
                                    value={formulario?.values?.fechaVentaPedido} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    InputLabelProps={{shrink: true}}
                                    label="Fecha venta *"
                                    error={formulario.touched.fechaVentaPedido && Boolean(formulario.errors.fechaVentaPedido)} 
                                    helperText={formulario.touched.fechaVentaPedido && formulario.errors.fechaVentaPedido} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="montoFinalPedido" 
                                    value={formulario?.values?.montoFinalPedido} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Valor pedido *" 
                                    error={formulario.touched.montoFinalPedido && Boolean(formulario.errors.montoFinalPedido)} 
                                    helperText={formulario.touched.montoFinalPedido && formulario.errors.montoFinalPedido}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="estadoPedido" 
                                    value={formulario?.values?.estadoPedido} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Seleccionar estado *"
                                    error={formulario.touched.estadoPedido && Boolean(formulario.errors.estadoPedido)} 
                                    helperText={formulario.touched.estadoPedido && formulario.errors.estadoPedido} 
                                >
                                    <MenuItem value="entregado">Entregado</MenuItem>
                                    <MenuItem value="pendiente">Pendiente</MenuItem>
                                    <MenuItem value="en proceso">En preceso</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="idEmpleado" 
                                    value={formulario?.values?.idEmpleado} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Ingresar empleado *"
                                    error={formulario.touched.idEmpleado && Boolean(formulario.errors.idEmpleado)} 
                                    helperText={formulario.touched.idEmpleado && formulario.errors.idEmpleado} 
                                >
                                    {
                                        empleado?.map(resp => (
                                            <MenuItem key={resp?.idEmpleado} value={resp?.idEmpleado}>{resp?.nombres} {resp?.apellidos}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                        </Grid>
                        <DialogActions className="btnDialogAction">
                            {
                                modoEdicion ? (
                                    <Button type="submit" variant="contained" color="primary"  > Guardar </Button>
                                    ) : (
                                    <Button type="submit" variant="contained" color="primary"  > Agregar </Button>
                                )
                            }
                            <Button onClick={onClose} variant="outlined" color="primary" autoFocus > Cancelar </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
                
            </Dialog>
        </div>
    )
}

export default DialogPedido;
