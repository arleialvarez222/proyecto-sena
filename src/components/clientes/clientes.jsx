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
import { buscarCliente, editarCliente, eliminarCliente, guardarCliente, obtenerClientes } from '../../actions/client-action';
import { useStateValue } from '../../context/store';
import Alert from '@material-ui/lab/Alert';


const Clientes = () => {

    const [respData, setRespData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(5);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectCliente, setSelectCliente] = useState();
    const [busqueda, setBusqueda] = useState('');
    const [ {openSnackbar}, dispatch] = useStateValue();

    const validationSchema = Yup.object({
        nombres: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        apellidos: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        direccion: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        documento: Yup.string() 
        .required('Este campo es obligatorio'),
        telefono: Yup.string() 
        .required('Este campo es obligatorio'),
        correo: Yup.string() 
        .email()
        .required('Este campo es obligatorio'),
    });

    const form = useFormik({
        initialValues: {
            nombres: '',
            apellidos : '',
            documento : '',
            direccion : '',
            telefono : '',
            correo : '',
        },
        onSubmit: (values) => {
            modoEdicion ? updateCliente(values) : insertarCliente(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const getClients = () =>{
        setLoading(true);
        obtenerClientes().then(response => {
            setTimeout(() => {
                setRespData(response?.data);
                setLoading(false);
            }, 1000);
        }).catch(error => {
            setLoading(false);
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                  open: true,
                  mensaje: <Alert severity="error">Error consultando los datos!</Alert>,
                },
            });
        });
    }

    const insertarCliente = () => {
        guardarCliente(form?.values).then(response => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success">Los datos se almacenaron correctamente</Alert>,
                },
            });
            getClients();
            limpiarCampos();
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                  open: true,
                  mensaje: <Alert severity="error">Se encontraron fallos al tratar de guardar los datos!</Alert>,
                },
            });
        })
    }

    const editarId = (resp) => {
        setModoEdicion(true);
        form?.setValues({...resp});
        abrirModalInsertar();
    }

    const updateCliente = ()=> {
        editarCliente(form?.values).then(response => {
            let respuesta = response?.data;
            let dataAuxiliar = respData;
            dataAuxiliar.map(resp => {
                if(resp.idCliente === form?.idCliente){
                    resp.nombres = respuesta?.nombres;
                    resp.apellidos = respuesta?.apellidos;
                    resp.telefono = respuesta?.telefono;
                    resp.direccion = respuesta?.direccion;
                    resp.correo = respuesta?.correo;
                    resp.documento = respuesta?.documento;
                }
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success" >Los datos se actualizaron</Alert>,
                    },
                });
                getClients();
                limpiarCampos();
                cerrarModalInsertar();
            })
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="error">No se actualizaron los datos!!!</Alert>,
                },
            });
        })
    }

    const deleteCliente = (idCliente) => {
        eliminarCliente(idCliente).then(response => {
            const arrayCliente = respData.filter(item => item?.idCliente !== idCliente);
            setRespData(arrayCliente);
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="warning">Los datos se eliminaron</Alert>,
                },
            });
            setModalEliminar(false);
            getClients();
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="error" >Error!!!, los datos no fueron eliminados</Alert>,
                },
            });
        });
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
       buscarCliente(busqueda).then(response => {
           setRespData(response?.data);
       });
    }

    useEffect(() => {
        getClients();;
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
                        deleteCliente={deleteCliente}
                        selectCliente={selectCliente}
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
                                    <TableCell align="left" > Documento </TableCell>
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
                                            <TableRow key={resp?.idCliente}>
                                                <TableCell align="left" > {resp?.idCliente} </TableCell>
                                                <TableCell align="left" > {resp?.nombres} </TableCell>
                                                <TableCell align="left" > {resp?.apellidos} </TableCell>
                                                <TableCell align="left" > {resp?.documento} </TableCell>
                                                <TableCell align="left" > {resp?.telefono} </TableCell>
                                                <TableCell align="left" > {resp?.direccion} </TableCell>
                                                <TableCell align="left" > {resp?.correo} </TableCell>
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
