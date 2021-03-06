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

function DialogProveedor({isOpen, onClose, form, modoEdicion })  {

    const classes = useStyles();

    return (
        <div >
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" >
                {
                    modoEdicion ? (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >edit</Icon>{"Editar proveedor"}
                        </DialogTitle>
                    ) : (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >add_circle_outlined</Icon>{"Agregar proveedor"}
                        </DialogTitle>
                    )
                }
                <DialogContent>
                    <form className={classes.root} onSubmit={ form.handleSubmit } >
                    <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="nombreProveedor" 
                                    value={form?.values?.nombreProveedor} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar nombre"
                                    error={form.touched.nombreProveedor && Boolean(form.errors.nombreProveedor)} 
                                    helperText={form.touched.nombreProveedor && form.errors.nombreProveedor} 
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
                                    type="text" 
                                    name="telefono" 
                                    value={form?.values?.telefono} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar tel??fono" 
                                    error={form.touched.telefono && Boolean(form.errors.telefono)} 
                                    helperText={form.touched.telefono && form.errors.telefono}
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

export default DialogProveedor;
