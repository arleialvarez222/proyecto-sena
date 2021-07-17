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

function DialogPedido({ isOpen, onClose, formulario, modoEdicion }) {
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
                                    name="cliente" 
                                    value={formulario?.values?.cliente} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Ingresar cliente"
                                    error={formulario.touched.cliente && Boolean(formulario.errors.cliente)} 
                                    helperText={formulario.touched.cliente && formulario.errors.cliente} 
                                >
                                    <MenuItem value="nombre_cliente1">Jose Avila</MenuItem>
                                    <MenuItem value="nombre_cliente2">Laura Villegas</MenuItem>
                                    <MenuItem value="nombre_cliente3">Arlei Roa</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="date"
                                    name="fechaVenta" 
                                    value={formulario?.values?.fechaVenta} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    error={formulario.touched.fechaVenta && Boolean(formulario.errors.fechaVenta)} 
                                    helperText={formulario.touched.fechaVenta && formulario.errors.fechaVenta} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="date"
                                    name="fechaEntrega" 
                                    value={formulario?.values?.fechaEntrega} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    error={formulario.touched.fechaEntrega && Boolean(formulario.errors.fechaEntrega)} 
                                    helperText={formulario.touched.fechaEntrega && formulario.errors.fechaEntrega} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="direccion" 
                                    value={formulario?.values?.direccion} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar direccion" 
                                    error={formulario.touched.direccion && Boolean(formulario.errors.direccion)} 
                                    helperText={formulario.touched.direccion && formulario.errors.direccion} 
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="telefono" 
                                    value={formulario?.values?.telefono} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar teléfono" 
                                    error={formulario.touched.telefono && Boolean(formulario.errors.telefono)} 
                                    helperText={formulario.touched.telefono && formulario.errors.telefono}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="valor" 
                                    value={formulario?.values?.valor} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Valor pedido" 
                                    error={formulario.touched.valor && Boolean(formulario.errors.valor)} 
                                    helperText={formulario.touched.valor && formulario.errors.valor}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="estado" 
                                    value={formulario?.values?.estado} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Seleccionar estado"
                                    error={formulario.touched.estado && Boolean(formulario.errors.estado)} 
                                    helperText={formulario.touched.estado && formulario.errors.estado} 
                                >
                                    <MenuItem value="entregado">Entregado</MenuItem>
                                    <MenuItem value="pendiente">Pendiente</MenuItem>
                                    <MenuItem value="en_proceso">En preceso</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="empleado" 
                                    value={formulario?.values?.empleado} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Ingresar empleado"
                                    error={formulario.touched.empleado && Boolean(formulario.errors.empleado)} 
                                    helperText={formulario.touched.empleado && formulario.errors.empleado} 
                                >
                                    <MenuItem value="nombre_empleado1">Jose Avila</MenuItem>
                                    <MenuItem value="nombre_empleado2">Laura Villegas</MenuItem>
                                    <MenuItem value="nombre_empleado3">Arlei Roa</MenuItem>
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
