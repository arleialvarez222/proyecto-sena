import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Icon, Grid, TextField } from '@material-ui/core';
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

function DialogCliente({isOpen, onClose, form, modoEdicion })  {

    const classes = useStyles();

    return (
        <div >
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" >
                {
                    modoEdicion ? (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >edit</Icon>{"Editar cliente"}
                        </DialogTitle>
                    ) : (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >add_circle_outlined</Icon>{"Agregar cliente"}
                        </DialogTitle>
                    )
                }
                <DialogContent>
                    <form className={classes.root} onSubmit={ form.handleSubmit } >
                    <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="nombre" 
                                    value={form?.values?.nombre} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar nombre"
                                    error={form.touched.nombre && Boolean(form.errors.nombre)} 
                                    helperText={form.touched.nombre && form.errors.nombre} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="apellido" 
                                    value={form?.values?.apellido} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar apellido" 
                                    error={form.touched.apellido && Boolean(form.errors.apellido)} 
                                    helperText={form.touched.apellido && form.errors.apellido} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="documento" 
                                    value={form?.values?.documento} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar documento" 
                                    error={form.touched.documento && Boolean(form.errors.documento)} 
                                    helperText={form.touched.documento && form.errors.documento} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="direccion" 
                                    value={form?.values?.direccion} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar direccion" 
                                    error={form.touched.direccion && Boolean(form.errors.direccion)} 
                                    helperText={form.touched.direccion && form.errors.direccion} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="email" 
                                    name="email" 
                                    value={form?.values?.email} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar e-mail" 
                                    error={form.touched.email && Boolean(form.errors.email)} 
                                    helperText={form.touched.email && form.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="telefono" 
                                    value={form?.values?.telefono} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar teléfono" 
                                    error={form.touched.telefono && Boolean(form.errors.telefono)} 
                                    helperText={form.touched.telefono && form.errors.telefono}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="salario" 
                                    value={form?.values?.salario} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar salario" 
                                    error={form.touched.salario && Boolean(form.errors.salario)} 
                                    helperText={form.touched.salario && form.errors.salario}
                                />
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

export default DialogCliente;
