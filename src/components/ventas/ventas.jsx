import React, {useState, useEffect} from 'react';
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Button, Icon} from '@material-ui/core';
import Style from '../../style/style';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import EliminarVenta from './eliminar-venta';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactPaginate from 'react-paginate';
import Loading from '../loading/loading';
import {obtenerEmpleado} from '../../actions/empleado-action';
import {Link} from 'react-router-dom';
import DetalleVenta from './detalle-venta';

const Ventas = () => {

    const [respData, setRespData] = useState([]);
    const [pasarIdVenta, setPasarIdVenta] = useState([]);
    const [detalle, setDetalle] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [selectEmpleado, setSelectEmpleado] = useState()
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [loading, setloading] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    const validationSchema = Yup.object({
        cliente: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        empleado: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        direccion: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        fechaVenta: Yup.string() 
        .required('Este campo es obligatorio'),
        fechaEntrega: Yup.string() 
        .required('Este campo es obligatorio'),
        telefono: Yup.string() 
        .required('Este campo es obligatorio'),
        valor: Yup.string() 
        .required('Este campo es obligatorio'),
        estado: Yup.string() 
        .required('Este campo es obligatorio'),
    });

    const formulario = useFormik({
        initialValues: {
            cliente: '',
            fechaVenta     : '',
            fechaEntrega     : '',
            telefono : '',
            direccion : '',
            valor : '',
            estado : '',
            empleado : '',
        },
        onSubmit: (values) => {
            registrarpedido(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const informacionPueba = () =>{
        setloading(true);
        obtenerEmpleado().then(response => {
            setRespData(response?.data);
            setloading(false);
        }).catch(error => {
            console.log(error);
        });
    } 

    const registrarpedido = () => {
        setRespData(formulario.values);
     }
     
     const limpiarCampos = () => {
         formulario?.resetForm();
     }
 
     const editarValor = (resp) => {
         setModoEdicion(true)
         formulario?.setValues({...resp});
     }
 
     const abrirDetalleVenta = (idVenta) => {
         setDetalle(true);
         setPasarIdVenta({...idVenta});
     }
 
     const cerrarDetalleVenta = () => {
         setDetalle(false);
         limpiarCampos();
     }
 
     const abrirModalEliminar = (ventaItem) => {
         setModalEliminar(true);
         setSelectEmpleado({ ...ventaItem });
     }
 
     const cerrarModalEliminar = () => {
         setModalEliminar(false);
     }
 
     const pagesVisited = pageNumber * dataPerPage;
     const displayData = respData?.slice(pagesVisited, pagesVisited + dataPerPage );
     const pageCount = Math?.ceil(respData?.length / dataPerPage);
 
     const changePage = ({ selected }) => {
       setPageNumber(selected);
     }; 
 
     const busquedaValueVenta = (e) => {
         setBusqueda(e?.target?.value);
     }
 
     const barraBusquedaVenta = () => {
         
     }
 
     useEffect(() => {
         informacionPueba();
     }, [])

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper}>
                <Typography component="h2" variant="h5" className="titulos">
                    Lista de ventas
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        component={Link}
                        to="/nuevaVenta" 
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                    > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar nueva venta
                    </Button>

                    <DetalleVenta
                        abrirDetalle={detalle}
                        cerrarDetalle={cerrarDetalleVenta}
                        idVenta={pasarIdVenta}
                    />

                    <EliminarVenta
                        abrir={modalEliminar}
                        cerrar={cerrarModalEliminar}
                        empleado={selectEmpleado}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValueVenta} margin="dense" variant="outlined" fullWidth label="Ingresar nombre" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaVenta } >
                            <SearchIcon color="primary" fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>

                { loading && <Loading/>}
                <Grid container>
                    <TableContainer >
                        <Table style={Style.tabla} size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" > Id </TableCell>
                                    <TableCell align="left" > Cliente </TableCell>
                                    <TableCell align="left" > Descripción </TableCell>
                                    <TableCell align="left" > Fecha compra </TableCell>
                                    <TableCell align="left" > Valor compra </TableCell>
                                    <TableCell align="left" > Empleado </TableCell>
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    displayData?.length > 0 ? (
                                        displayData?.map(resp => (
                                            <TableRow key={resp?.idEmployee}>
                                                <TableCell align="left" > {resp?.idEmployee} </TableCell>
                                                <TableCell align="left" > {resp?.names} </TableCell>
                                                <TableCell align="left" > {resp?.lastNames} </TableCell>
                                                <TableCell align="left" > {resp?.email} </TableCell>
                                                <TableCell align="left" > {resp?.telephone} </TableCell>
                                                <TableCell align="left" > {resp?.address} </TableCell>
                                                <TableCell align="left" > 
                                                    <IconButton onClick={ () => editarValor(resp) } >
                                                        <EditIcon style={Style.iconoEdit}/>
                                                    </IconButton>
                                                    <IconButton onClick={ () => abrirModalEliminar(resp)}>
                                                        <DeleteIcon style={Style.iconoDelet}/>
                                                    </IconButton>
                                                    <IconButton onClick={ () => abrirDetalleVenta(resp)}>
                                                        <ListIcon style={Style.iconoEdit}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="left" > data prueba </TableCell>
                                            <TableCell align="left" > data prueba </TableCell>
                                            <TableCell align="left" > data prueba </TableCell>
                                            <TableCell align="left" > data prueba </TableCell>
                                            <TableCell align="left" > data prueba </TableCell>
                                            <TableCell align="left" > 
                                                <IconButton onClick={ () => editarValor() } >
                                                    <EditIcon style={Style.iconoEdit}/>
                                                </IconButton>
                                                <IconButton onClick={ () => abrirModalEliminar()}>
                                                    <DeleteIcon style={Style.iconoDelet}/>
                                                </IconButton>
                                                <IconButton onClick={ () => abrirDetalleVenta()}>
                                                    <ListIcon style={Style.iconoEdit}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </Grid>
            </div>
        </Container>
    )
}

export default Ventas;
