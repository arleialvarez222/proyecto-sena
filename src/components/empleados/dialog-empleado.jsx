import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Icon, Grid, TextField,  } from '@material-ui/core';
import Style from '../../style/style';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '28ch', 
      },
    },
}));

function DialogEmpleado({ isOpen, onClose, formulario, modoEdicion }) {
    const classes = useStyles();

    return (
        <div >
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" className="dialogos" >
                {
                    modoEdicion ? (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" >
                            <Icon style={Style.iconBoton} >edit</Icon>{"Editar empleado"}
                        </DialogTitle>
                    ) : (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >add_circle_outlined</Icon>{"Agregar empleado"}
                        </DialogTitle>
                    )
                }
                <DialogContent>
                    <form className={classes.root} onSubmit={formulario?.handleSubmit} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="nombres" 
                                    value={formulario?.values?.nombres} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar nombres *"
                                    error={formulario.touched.nombres && Boolean(formulario.errors.nombres)} 
                                    helperText={formulario.touched.nombres && formulario.errors.nombres} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="apellidos" 
                                    value={formulario?.values?.apellidos} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar apellidos *" 
                                    error={formulario.touched.apellidos && Boolean(formulario.errors.apellidos)} 
                                    helperText={formulario.touched.apellidos && formulario.errors.apellidos} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number"
                                    name="documento" 
                                    value={formulario?.values?.documento} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar documento *" 
                                    error={formulario.touched.documento && Boolean(formulario.errors.documento)} 
                                    helperText={formulario.touched.documento && formulario.errors.documento} 
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
                                    label="Ingresar direccion *" 
                                    error={formulario.touched.direccion && Boolean(formulario.errors.direccion)} 
                                    helperText={formulario.touched.direccion && formulario.errors.direccion} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="email" 
                                    name="correo" 
                                    value={formulario?.values?.correo} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar e-mail *" 
                                    error={formulario.touched.correo && Boolean(formulario.errors.correo)} 
                                    helperText={formulario.touched.correo && formulario.errors.correo}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    //type="number" 
                                    name="telefono" 
                                    value={formulario?.values?.telefono} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar teléfono *" 
                                    error={formulario.touched.telefono && Boolean(formulario.errors.telefono)} 
                                    helperText={formulario.touched.telefono && formulario.errors.telefono}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="salarioEmpleado" 
                                    value={formulario?.values?.salarioEmpleado} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar salario *" 
                                    error={formulario.touched.salarioEmpleado && Boolean(formulario.errors.salarioEmpleado)} 
                                    helperText={formulario.touched.salarioEmpleado && formulario.errors.salarioEmpleado}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="segSocEmpleado" 
                                    value={formulario?.values?.segSocEmpleado} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Seguridad social *" 
                                    error={formulario.touched.segSocEmpleado && Boolean(formulario.errors.segSocEmpleado)} 
                                    helperText={formulario.touched.segSocEmpleado && formulario.errors.segSocEmpleado}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number"
                                    name="comisionEmpleado" 
                                    value={formulario?.values?.comisionEmpleado} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Comision" 
                                    error={formulario.touched.comisionEmpleado && Boolean(formulario.errors.comisionEmpleado)} 
                                    helperText={formulario.touched.comisionEmpleado && formulario.errors.comisionEmpleado}
                                />
                            </Grid>
                        
                        </Grid>
                        <DialogActions className="botonesFormularios">
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

export default DialogEmpleado;
