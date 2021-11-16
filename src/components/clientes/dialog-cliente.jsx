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
                                    name="nombres" 
                                    value={form?.values?.nombres} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar nombres *"
                                    error={form.touched.nombres && Boolean(form.errors.nombres)} 
                                    helperText={form.touched.nombres && form.errors.nombres} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="apellidos" 
                                    value={form?.values?.apellidos} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar apellidos *" 
                                    error={form.touched.apellidos && Boolean(form.errors.apellidos)} 
                                    helperText={form.touched.apellidos && form.errors.apellidos} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                type="number"
                                    name="documento" 
                                    value={form?.values?.documento} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar documento *" 
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
                                    label="Ingresar direccion *" 
                                    error={form.touched.direccion && Boolean(form.errors.direccion)} 
                                    helperText={form.touched.direccion && form.errors.direccion} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="email" 
                                    name="correo" 
                                    value={form?.values?.correo} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar e-mail *" 
                                    error={form.touched.correo && Boolean(form.errors.correo)} 
                                    helperText={form.touched.correo && form.errors.correo}
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
                                    label="Ingresar teléfono *" 
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

export default DialogCliente;
