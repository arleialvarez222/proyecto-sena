import React, {useState, useEffect} from 'react';
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Button, Icon} from '@material-ui/core';
import Style from '../../style/style';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormularioVenta from './formulario-venta';

const DialogVenta = ({displayData}) => {


    const validationSchema = Yup.object({
        cliente: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        empleado: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        descripcion: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        fechaCompra: Yup.string() 
        .required('Este campo es obligatorio'),
        valorTotal: Yup.string() 
        .required('Este campo es obligatorio'),
        nomProducto: Yup.string() 
        .required('Este campo es obligatorio'),
        cantidad: Yup.string() 
        .required('Este campo es obligatorio'),
        valorUnit: Yup.string() 
        .required('Este campo es obligatorio'),
    });

    const formulario = useFormik({
        initialValues: {
            cliente: '',
            descripcion     : '',
            empleado : '',
            fechaCompra : '',
            valorTotal : '',
            nomProducto : '',
            cantidad : '',
            valorUnit : '',
        },
        onSubmit: (values) => {
            registrarVenta(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const registrarVenta = () =>{
        console.log(formulario.values);
    }

    const limpiarCampos = () => {
        formulario?.resetForm();
    }

    return (
        <Container maxWidth="xl" style={Style.container} >
            <div style={Style.paper}>
                <Grid>
                    <Typography component="h2" variant="h5" className="titulos">
                        Formular venta
                    </Typography>
                </Grid>
                <Grid container>
                   <FormularioVenta
                        modoEdicion
                        formulario={formulario}
                   />
                </Grid>
                <Grid container className="tablaForVenta">
                    <TableContainer >
                        <Table style={Style.tabla} size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" > Id </TableCell>
                                    <TableCell align="left" > Producto </TableCell>
                                    <TableCell align="left" > Cantidad </TableCell>
                                    <TableCell align="left" > Valor unidad </TableCell>
                                    <TableCell align="left" > Valor unidad </TableCell>
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableRow >
                                    <TableCell align="left" > 1  </TableCell>
                                    <TableCell align="left" > producto </TableCell>
                                    <TableCell align="left" > producto  </TableCell>
                                    <TableCell align="left" > producto </TableCell>
                                    <TableCell align="left" > producto  </TableCell>
                                    <TableCell align="left" > 
                                        <IconButton  >
                                            <EditIcon style={Style.iconoEdit}/>
                                        </IconButton>
                                        <IconButton >
                                            <DeleteIcon style={Style.iconoDelet}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                    
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container item md={12} >
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                    >
                        <Icon style={Style.iconBoton} >save</Icon> Guardar venta
                    </Button>
                </Grid>
            </div>
        </Container>
    )
}

export default DialogVenta;
