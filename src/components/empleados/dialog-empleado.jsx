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
                                    name="nombre" 
                                    value={formulario?.values?.nombre} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar nombre"
                                    error={formulario.touched.nombre && Boolean(formulario.errors.nombre)} 
                                    helperText={formulario.touched.nombre && formulario.errors.nombre} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="apellido" 
                                    value={formulario?.values?.apellido} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar apellido" 
                                    error={formulario.touched.apellido && Boolean(formulario.errors.apellido)} 
                                    helperText={formulario.touched.apellido && formulario.errors.apellido} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="documento" 
                                    value={formulario?.values?.documento} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar documento" 
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
                                    label="Ingresar direccion" 
                                    error={formulario.touched.direccion && Boolean(formulario.errors.direccion)} 
                                    helperText={formulario.touched.direccion && formulario.errors.direccion} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="email" 
                                    name="email" 
                                    value={formulario?.values?.email} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar e-mail" 
                                    error={formulario.touched.email && Boolean(formulario.errors.email)} 
                                    helperText={formulario.touched.email && formulario.errors.email}
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
                                    name="salario" 
                                    value={formulario?.values?.salario} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar salario" 
                                    error={formulario.touched.salario && Boolean(formulario.errors.salario)} 
                                    helperText={formulario.touched.salario && formulario.errors.salario}
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
