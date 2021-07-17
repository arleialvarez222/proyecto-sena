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

function DialogInventario({isOpen, onClose, form, modoEdicion })  {

    const classes = useStyles();

    return (
        <div >
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" >
                {
                    modoEdicion ? (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >edit</Icon>{"Editar inventario"}
                        </DialogTitle>
                    ) : (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >add_circle_outlined</Icon>{"Agregar inventario"}
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
                                    label="Nombre producto"
                                    error={form.touched.nombre && Boolean(form.errors.nombre)} 
                                    helperText={form.touched.nombre && form.errors.nombre} 
                                />
                            </Grid>
                           
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="date"
                                    name="fechaIngreso" 
                                    value={form?.values?.fechaIngreso} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    error={form.touched.fechaIngreso && Boolean(form.errors.fechaIngreso)} 
                                    helperText={form.touched.fechaIngreso && form.errors.fechaIngreso} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="cantidad" 
                                    value={form?.values?.cantidad} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar e-mail" 
                                    error={form.touched.cantidad && Boolean(form.errors.cantidad)} 
                                    helperText={form.touched.cantidad && form.errors.cantidad}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="precio" 
                                    value={form?.values?.precio} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar teléfono" 
                                    error={form.touched.precio && Boolean(form.errors.precio)} 
                                    helperText={form.touched.precio && form.errors.precio}
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

export default DialogInventario;
