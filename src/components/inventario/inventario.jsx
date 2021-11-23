import React, {useState, useEffect} from 'react'
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TextField, TableRow, Typography, IconButton, Button, Icon } from '@material-ui/core';
import Style from '../../style/style';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import ReactPaginate from 'react-paginate';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from '../loading/loading';
import DialogInventario from './dialog-inventario';
import ConfirmarEliminarInventario from './eliminar-inventario';
import { editarInventarios, eliminarInventarios, guardarInventarios, obtenerInventarios } from '../../actions/inventory-action';
import { obtenerProductos } from '../../actions/product-action';
import { useStateValue } from '../../context/store';
import Alert from '@material-ui/lab/Alert';

const Inventario = () => {

    const [respData, setRespData] = useState([]);
    const [producto, setProducto] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectInventory, setSelectInventory] = useState();
    const [busqueda, setBusqueda] = useState('');
    const [ {openSnackbar}, dispatch] = useStateValue();

    const validationSchema = Yup.object({
        cantDisponibleProducto: Yup.string()
        .required('Este campo es obligatorio'),
        cantMinimaProducto: Yup.string() 
        .required('Este campo es obligatorio'),
        idProducto: Yup.string() 
        .required('Este campo es obligatorio'),
        precio: Yup.string() 
        .required('Este campo es obligatorio'),
    });
    //console.log(respData)
    const form = useFormik({
        initialValues: {
            cantDisponibleProducto: '',
            cantMinimaProducto : '',
            idProducto : '',
            precio : '',
        },
        onSubmit: (values) => {
            modoEdicion ? updateInventory(values) : insertarinventario(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const getInventorys = () =>{
        setLoading(true);
        obtenerInventarios().then(response => {
            setTimeout(() => {
                setRespData(response?.data);
                setLoading(false);
            }, 1000);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const getProduct = () => {
            obtenerProductos().then(response => {
                setProducto(response?.data);
            })
        }
        getProduct();
    }, [])

    const insertarinventario = () => {
        //console.log(form?.values)
        guardarInventarios(form?.values).then(response => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success">Los datos se almacenaron correctamente</Alert>,
                },
            });
            getInventorys();
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

    const updateInventory = () => {
        editarInventarios(form?.values).then(response => {
            const respuesta = response?.data;
            const dataAuxiliar = respData;
            dataAuxiliar?.map(resp => {
                if(resp?.idInventario === form?.idInventario){
                    resp.cantDisponibleProducto = respuesta?.cantDisponibleProducto;
                    resp.cantMinimaProducto = respuesta?.cantMinimaProducto;
                    resp.idProducto = respuesta?.idProducto;
                    resp.precio = respuesta?.precio;
                }
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success" >Los datos se actualizaron exitosamente</Alert>,
                    },
                });
                getInventorys();
                limpiarCampos();
                cerrarModalInsertar();
                return respuesta;
            })
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="success" >Se encontraron fallas al editar los datos</Alert>,
                },
            });
        })
    }

    const deleteInventory = (idInventario) => {
        eliminarInventarios(idInventario).then(response => {
            const arrayFiltrado = respData?.map(x => x?.idInventario !== idInventario);
            setRespData(arrayFiltrado);
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="warning">Los datos se eliminaron</Alert>,
                },
            });
            getInventorys();
            cerrarModEliminar();
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="warning">Los datos no se eliminaron correctamente</Alert>,
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

    const abrirModEliminar = (clienteItem) => {
        setModalEliminar(true);
        setSelectInventory(clienteItem);
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

    const busquedaValueInventario = (e) => {
        setBusqueda(e?.target?.value);
    }

    const barraBusquedaInventario = () => {
       
    }

    useEffect(() => {
        getInventorys();;
    }, [])

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper} >
                <Typography component="h2" variant="h5" className="titulos" >
                    lista de inventario
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        type="submit"  
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                        onClick={abrirModalInsertar} > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar inventario
                    </Button>

                    <DialogInventario
                        isOpen={modalInsertar}
                        onClose={cerrarModalInsertar}
                        form={form}
                        modoEdicion={modoEdicion}
                        producto={producto}
                    />

                    <ConfirmarEliminarInventario
                        abrir={modalEliminar}
                        cerrarModal={cerrarModEliminar}
                        selectInventory={selectInventory}
                        deleteInventory={deleteInventory}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValueInventario} margin="dense" variant="outlined" fullWidth label="Nombre producto" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaInventario } >
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
                                    <TableCell align="left" > Nombre producto </TableCell>
                                    <TableCell align="left" > Cantidad Mínima </TableCell>
                                    <TableCell align="left" > Cantidad Máxima </TableCell>
                                    <TableCell align="left" > Precio/unit </TableCell>
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    displayData?.length > 0 ? (
                                        displayData?.map(resp => (
                                            <TableRow key={resp?.idInventario}>
                                                <TableCell align="left" > {resp?.idInventario} </TableCell>
                                                <TableCell align="left" > {resp?.producto?.nombreProducto} </TableCell>
                                                <TableCell align="left" > {resp?.cantMinimaProducto} </TableCell>
                                                <TableCell align="left" > {resp?.cantDisponibleProducto} </TableCell>
                                                <TableCell align="left" > {resp?.precio} </TableCell>
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

export default Inventario;
