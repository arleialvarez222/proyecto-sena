import React, {useState, useEffect} from 'react'
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TextField, TableRow, Typography, IconButton, Button, Icon } from '@material-ui/core';
import Style from '../../style/style';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import DialogCliente from './dialog-cliente';
import ReactPaginate from 'react-paginate';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ConfirmarEliminarCliente from './eliminar-cliente';
import Loading from '../loading/loading';
import {obtenerEmpleado} from '../../actions/prueba-service';


const Clientes = () => {

    const [respData, setRespData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectCliente, setSelectCliente] = useState();
    const [busqueda, setBusqueda] = useState('');

    const validationSchema = Yup.object({
        nombre: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        apellido: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        direccion: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        salario: Yup.string() 
        .required('Este campo es obligatorio'),
        documento: Yup.string() 
        .required('Este campo es obligatorio'),
        telefono: Yup.string() 
        .required('Este campo es obligatorio'),
        email: Yup.string() 
        .email()
        .required('Este campo es obligatorio'),
    });

    const form = useFormik({
        initialValues: {
            nombre: '',
            apellido     : '',
            documento : '',
            direccion : '',
            telefono : '',
            email : '',
            salario : '',
        },
        onSubmit: (values) => {
            insertarCliente(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const dataPruebaCliente = () =>{
        setLoading(true);
        obtenerEmpleado().then(response => {
            setRespData(response?.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }

    const insertarCliente = () => {
        console.log(form.values);
    }

    const editarId = (resp) => {
        setModoEdicion(true);
        form?.setValues({...resp});
        abrirModalInsertar();
    }

    const limpiarCampos = () => {
        form?.resetForm();
    }

    const abrirModalInsertar = () => {
        setModalInsertar(true);
    }

    const cerrarModalInsertar = () => {
        setModalInsertar(false);
        setModoEdicion(false);
        limpiarCampos();
    }

    const abrirModEliminar = (clienteItem) => {
        setModalEliminar(true);
        setSelectCliente(clienteItem);
    }

    const cerrarModEliminar = () => {
        setModalEliminar(false);
    }

    const pagesVisited = pageNumber * dataPerPage;
    const displayData = respData?.slice(pagesVisited, pagesVisited + dataPerPage );
    const pageCount = Math.ceil(respData?.length / dataPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    const busquedaValueCliente = (e) => {
        setBusqueda(e?.target?.value);
    }

    const barraBusquedaCliente = () => {
       
    }

    useEffect(() => {
        dataPruebaCliente();;
    }, [])

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper} >
                <Typography component="h2" variant="h5" className="titulos" >
                    lista de clientes
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        type="submit"  
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                        onClick={abrirModalInsertar} > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar cliente
                    </Button>

                    <DialogCliente
                        isOpen={modalInsertar}
                        onClose={cerrarModalInsertar}
                        form={form}
                        modoEdicion={modoEdicion}
                    />

                    <ConfirmarEliminarCliente
                        abrir={modalEliminar}
                        cerrarModal={cerrarModEliminar}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValueCliente} margin="dense" variant="outlined" fullWidth label="# Documento" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaCliente } >
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
                                    <TableCell align="left" > Nombre </TableCell>
                                    <TableCell align="left" > Apellido </TableCell>
                                    <TableCell align="left" > Telefono </TableCell>
                                    <TableCell align="left" > Direccion </TableCell>
                                    <TableCell align="left" > E-mail </TableCell>
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
                                                <TableCell align="left" > {resp?.telephone} </TableCell>
                                                <TableCell align="left" > {resp?.address} </TableCell>
                                                <TableCell align="left" > {resp?.email} </TableCell>
                                                <TableCell align="left" > 
                                                    <IconButton onClick={ () => editarId(resp) } >
                                                        <EditIcon style={Style.iconoEdit}/>
                                                    </IconButton>
                                                    <IconButton onClick={ () => abrirModEliminar(resp)}>
                                                        <DeleteIcon style={Style.iconoDelet}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > 
                                                <IconButton onClick={ () => editarId() } >
                                                    <EditIcon style={Style.iconoEdit}/>
                                                </IconButton>
                                                <IconButton onClick={ () => abrirModEliminar()}>
                                                    <DeleteIcon style={Style.iconoDelet}/>
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

export default Clientes;
