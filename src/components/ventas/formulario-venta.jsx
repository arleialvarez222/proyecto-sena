import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Icon, Grid, TextField, Typography,  } from '@material-ui/core';
import Style from '../../style/style';
import MenuItem from '@material-ui/core/MenuItem';

const FormularioVenta = ({formulario, modoEdicion}) => {

    return (
        <div className="formuVenta">
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
            <form style={Style.form} onSubmit={formulario?.handleSubmit} >
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
                                    label="Seleccionar cliente"
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
                                    name="descripcion" 
                                    value={formulario?.values?.descripcion} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Descripción"
                                    error={formulario.touched.descripcion && Boolean(formulario.errors.descripcion)} 
                                    helperText={formulario.touched.descripcion && formulario.errors.descripcion} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="date"
                                    name="fechaCompra" 
                                    value={formulario?.values?.fechaCompra} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    error={formulario.touched.fechaCompra && Boolean(formulario.errors.fechaCompra)} 
                                    helperText={formulario.touched.fechaCompra && formulario.errors.fechaCompra} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number"
                                    name="valor" 
                                    value={formulario?.values?.valor} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar valor" 
                                    error={formulario.touched.valor && Boolean(formulario.errors.valor)} 
                                    helperText={formulario.touched.valor && formulario.errors.valor} 
                                />
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
                        <Grid className="titulosProducto">
                            <Typography component="h4" variant="h5" className="titulos">
                                selecionar producto
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="Producto" 
                                    value={formulario?.values?.Producto} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Seleccionar Producto"
                                    error={formulario.touched.Producto && Boolean(formulario.errors.Producto)} 
                                    helperText={formulario.touched.Producto && formulario.errors.Producto} 
                                >
                                    <MenuItem value="nombre_cliente1"> crema 1 </MenuItem>
                                    <MenuItem value="nombre_cliente2"> crema 2 </MenuItem>
                                    <MenuItem value="nombre_cliente3"> crema 3 </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number"
                                    name="cantidad" 
                                    value={formulario?.values?.cantidad} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Cantidad"
                                    error={formulario.touched.cantidad && Boolean(formulario.errors.cantidad)} 
                                    helperText={formulario.touched.cantidad && formulario.errors.cantidad} 
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number"
                                    name="valorUnit" 
                                    value={formulario?.values?.valorUnit} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar valor/Unit" 
                                    error={formulario.touched.valorUnit && Boolean(formulario.errors.valorUnit)} 
                                    helperText={formulario.touched.valorUnit && formulario.errors.valorUnit} 
                                />
                            </Grid>
                            
                            
                        </Grid>
                        {/* <DialogActions >
                            {
                                modoEdicion ? (
                                    <Button type="submit" variant="contained" color="primary" fullWidth > Guardar </Button>
                                    ) : (
                                    <Button type="submit" variant="contained" color="primary" fullWidth > Agregar </Button>
                                )
                            }
                            
                        </DialogActions> */}
                    </form>
            </Grid>
        </div>
    )
}

export default FormularioVenta;
