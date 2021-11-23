import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Icon, Grid, TextField, MenuItem } from '@material-ui/core';
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

function DialogInventario({isOpen, onClose, form, modoEdicion, producto })  {

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
                                    name="idProducto" 
                                    value={form?.values?.idProducto} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    variant="outlined" 
                                    fullWidth 
                                    select
                                    label="Nombre producto *"
                                    error={form.touched.idProducto && Boolean(form.errors.idProducto)} 
                                    helperText={form.touched.idProducto && form.errors.idProducto} 
                                >
                                    {
                                        producto?.map(resp => ( 
                                            <MenuItem key={resp?.idProducto} value={resp?.idProducto}> {resp?.nombreProducto} </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                           
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number"
                                    name="precio" 
                                    value={form?.values?.precio} 
                                    onChange={form?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    label="Precio *"
                                    fullWidth 
                                    error={form.touched.precio && Boolean(form.errors.precio)} 
                                    helperText={form.touched.precio && form.errors.precio} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="cantDisponibleProducto" 
                                    value={form?.values?.cantDisponibleProducto} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Cantidad máxima *" 
                                    error={form.touched.cantDisponibleProducto && Boolean(form.errors.cantDisponibleProducto)} 
                                    helperText={form.touched.cantDisponibleProducto && form.errors.cantDisponibleProducto}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    type="number" 
                                    name="cantMinimaProducto" 
                                    value={form?.values?.cantMinimaProducto} 
                                    onChange={form?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Cantidad Mínima *" 
                                    error={form.touched.cantMinimaProducto && Boolean(form.errors.cantMinimaProducto)} 
                                    helperText={form.touched.cantMinimaProducto && form.errors.cantMinimaProducto}
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
