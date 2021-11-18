import React, {useState, useEffect} from 'react'
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TextField, TableRow, Typography, IconButton, Button, Icon } from '@material-ui/core';
import Style from '../../style/style';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import DialogProveedor from './agregar-proveedor';
import ReactPaginate from 'react-paginate';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ConfirmarEliminarProveedor from './eliminar-proveedor';
import Loading from '../loading/loading';
import { editarProveedor, eliminarProveedor, guardarProveedor, obtenerProveedores } from '../../actions/proveedor-action';
import { useStateValue } from '../../context/store';
import Alert from '@material-ui/lab/Alert';

const Proveedor = () => {

    const [respData, setRespData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectProveedor, setSelectProveedor] = useState();
    const [busqueda, setBusqueda] = useState('');
    const [ {openSnackbar}, dispatch] = useStateValue();

    const validationSchema = Yup.object({
        nombreProveedor: Yup.string()
        .required('Este campo es obligatorio')
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres'),
        telefono: Yup.string() 
        .min(7, 'Minimo 7 numeros')
        .required('Este campo es obligatorio'),
        direccion: Yup.string() 
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        email: Yup.string() 
        .email("Este E-mail no es válido")
        .required('Este campo es obligatorio'),
    });

    const form = useFormik({
        initialValues: {
            nombreProveedor: '',
            telefono: '',
            direccion: '',
            email: '',
        },
        onSubmit: (values) => {
            modoEdicion ? uddateSupplier(values) : saveSupplier(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const getProveedor = () =>{
        setLoading(true);
        obtenerProveedores().then(response => {
            setTimeout(() => {
                setRespData(response?.data);
                setLoading(false);
            }, 1000);
        }).catch(error => {
            console.log(error);
        });
    }

    const saveSupplier = () => {
        guardarProveedor(form?.values).then(response => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success">Los datos se almacenaron correctamente</Alert>,
                },
            });
            getProveedor();
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

    const uddateSupplier = () => {
        editarProveedor(form?.values).then(response => {
            let respuesta = response?.data;
            let dataAuxiliar = respData;
            dataAuxiliar?.map(resp => {
                if(resp?.idProveedor === form?.idProveedor){
                    resp.nombreProveedor = respuesta?.nombreProveedor;
                    resp.telefono = respuesta?.telefono;
                    resp.direccion = respuesta?.direccion;
                    resp.email = respuesta?.email;
                }
            })
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="success" >Actualización exitosa</Alert>,
                },
            });
            getProveedor();
            cerrarModalInsertar();
            limpiarCampos();
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

    const deleteSupplier = (idProveedor) => {
        eliminarProveedor(idProveedor).then(response => {
            const arrayFiltrado =respData?.filter(x => x?.idProveedor !== idProveedor);
            setRespData(arrayFiltrado);
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="warning">Los datos del proveedor se eliminaron</Alert>,
                },
            });
            getProveedor();
            cerrarModEliminar()
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="error" >Error!!!, los datos no fueron eliminados</Alert>,
                },
            });
        })
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

    const abrirModEliminar = (proveedorItem) => {
        setModalEliminar(true);
        setSelectProveedor(proveedorItem);
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

    const busquedaValueProveedor = (e) => {
        setBusqueda(e?.target?.value);
    }

    const barraBusquedaProveedor = () => {
       
    }

    useEffect(() => {
        getProveedor();;
    }, [])

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper} >
                <Typography component="h2" variant="h5" className="titulos" >
                    lista de proveedores
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        type="submit"  
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                        onClick={abrirModalInsertar} > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar proveedor
                    </Button>

                    <DialogProveedor
                        isOpen={modalInsertar}
                        onClose={cerrarModalInsertar}
                        form={form}
                        modoEdicion={modoEdicion}
                    />

                    <ConfirmarEliminarProveedor
                        abrir={modalEliminar}
                        cerrar={cerrarModEliminar}
                        deleteSupplier={deleteSupplier}
                        selectProveedor={selectProveedor}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValueProveedor} margin="dense" variant="outlined" fullWidth label="# Documento" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaProveedor } >
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
                                            <TableRow key={resp?.idProveedor}>
                                                <TableCell align="left" > {resp?.idProveedor} </TableCell>
                                                <TableCell align="left" > {resp?.nombreProveedor} </TableCell>
                                                <TableCell align="left" > {resp?.telefono} </TableCell>
                                                <TableCell align="left" > {resp?.direccion} </TableCell>
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

export default Proveedor;
