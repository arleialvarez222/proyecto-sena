import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Icon, Grid, TextField, MenuItem  } from '@material-ui/core';
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

const AgregarProducto = ({ isOpen, onClose, formulario, modoEdicion, proveedor }) => {

    const classes = useStyles();
    return (
        <div >
            <Dialog open={isOpen} aria-labelledby="alert-dialog-title" className="dialogos" >
                {
                    modoEdicion ? (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" >
                            <Icon style={Style.iconBoton} >edit</Icon>{"Editar producto"}
                        </DialogTitle>
                    ) : (
                        <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title" > 
                            <Icon style={Style.iconBoton} >add_circle_outlined</Icon>{"Agregar producto"}
                        </DialogTitle>
                    )
                }
                <DialogContent>
                    <form className={classes.root} onSubmit={formulario?.handleSubmit} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="nombreProducto" 
                                    value={formulario?.values?.nombreProducto} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    variant="outlined" 
                                    fullWidth 
                                    label="Ingresar nombre *"
                                    error={formulario.touched.nombreProducto && Boolean(formulario.errors.nombreProducto)} 
                                    helperText={formulario.touched.nombreProducto && formulario.errors.nombreProducto} 
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField 
                                    name="describProducto" 
                                    value={formulario?.values?.describProducto} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" variant="outlined" 
                                    fullWidth 
                                    label="Ingresar descripcion *" 
                                    error={formulario.touched.describProducto && Boolean(formulario.errors.describProducto)} 
                                    helperText={formulario.touched.describProducto && formulario.errors.describProducto} 
                                />
                            </Grid>
                            {/* <Grid item xs={12} md={6}>
                                <TextField 
                                    name="proveedor" 
                                    value={formulario?.values?.proveedor} 
                                    onChange={formulario?.handleChange} 
                                    margin="dense" 
                                    id="select"
                                    select
                                    variant="outlined" 
                                    fullWidth 
                                    label="Seleccionar proveedor" 
                                    error={formulario.touched.proveedor && Boolean(formulario.errors.proveedor)} 
                                    helperText={formulario.touched.proveedor && formulario.errors.proveedor} 
                                >
                                    {
                                        proveedor?.map(resp => (
                                            <MenuItem key={resp?.idProveedor} value={resp?.idProveedor} > {resp?.nombreProveedor} </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid> */}
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

export default AgregarProducto;
