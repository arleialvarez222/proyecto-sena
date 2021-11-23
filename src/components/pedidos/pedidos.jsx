import React, {useState, useEffect} from 'react';
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Button, Icon} from '@material-ui/core';
import Style from '../../style/style';
import DialogPedido from './dialog.pedido';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmarEliminarPedido from './eliminar-pedido';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactPaginate from 'react-paginate';
import Loading from '../loading/loading';
import {obtenerEmpleado} from '../../actions/empleado-action';
import { editarPedido, eliminarPedido, guardarPedido, obtenerPedido } from '../../actions/order-action';
import { obtenerClientes } from '../../actions/client-action';
import Alert from '@material-ui/lab/Alert';
import { useStateValue } from '../../context/store';

const Pedidos = () => {

    const [respData, setRespData] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [empleado, setEmpleado] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [selectOrder, setSelectOrder] = useState()
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [loading, setloading] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [ {openSnackbar}, dispatch] = useStateValue();

    const validationSchema = Yup.object({
        idCliente: Yup.string()
        .required('Este campo es obligatorio'),
        idEmpleado: Yup.string()
        .required('Este campo es obligatorio'),
        estadoPedido: Yup.string()
        .required('Este campo es obligatorio'),
        montoFinalPedido: Yup.string() 
        .required('Este campo es obligatorio'),
        fechaVentaPedido: Yup.string() 
        .required('Este campo es obligatorio'),
    });

    const formulario = useFormik({
        initialValues: {
            fechaVentaPedido: '',
            montoFinalPedido     : '',
            estadoPedido     : '',
            idEmpleado : '',
            idCliente : '',
        },
        onSubmit: (values) => {
            modoEdicion ? updateOrder(values) : saveOrder(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const getOrder = () =>{
        setloading(true);
        obtenerPedido().then(response => {
            setTimeout(() => {
                setRespData(response?.data);
                setloading(false);
            }, 1000);
        }).catch(error => {
            console.log(error);
        });
    } 

    useEffect(() => {
        const getClient = () => {
            obtenerClientes().then(response => {
                setCliente(response?.data);
            })
        }
        const getEmploye = () => {
            obtenerEmpleado().then(response => {
                setEmpleado(response?.data);
            })
        }

        getClient();
        getEmploye();
    }, [])

    const saveOrder = () => {
        guardarPedido(formulario?.values).then(response => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success">Los datos se almacenaron correctamente</Alert>,
                },
            });
            getOrder();
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

    const editarValor = (resp) => {
        setModoEdicion(true)
        formulario?.setValues({...resp});
        abrirModInsertar();
    }

    const updateOrder = () => {
        editarPedido(formulario?.values).then(response => {
            const respuesta = response?.data;
            const dataEdit = respData;
            dataEdit?.map(resp => {
                if(resp?.idPedido === formulario?.idPedido){
                    resp.fechaVentaPedido = respuesta?.fechaVentaPedido;
                    resp.montoFinalPedido = respuesta?.montoFinalPedido;
                    resp.estadoPedido = respuesta?.estadoPedido;
                    resp.idEmpleado = respuesta?.idEmpleado;
                    resp.idCliente = respuesta?.idCliente;
                }
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success" >Los datos se actualizaron exitosamente</Alert>,
                    },
                });
                getOrder();
                limpiarCampos();
                cerrarModInsertar();
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

    const deleteOrder = (idPedido) => {
        eliminarPedido(idPedido).then(response => {
            const arrayFiltrado = respData?.filter(x => x?.idPedido !== idPedido);
            setRespData(arrayFiltrado);
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje:  <Alert severity="warning">Los datos se eliminaron de la base de datos</Alert>,
                },
            });
            getOrder();
            cerrarModalEliminar();
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
        formulario?.resetForm();
    }
 
    const abrirModInsertar = () => {
        setModalInsertar(true);
    }

    const cerrarModInsertar = () => {
        setModalInsertar(false);
        setModoEdicion(false);
        limpiarCampos();
    }

    const abrirModalEliminar = (empleadoItem) => {
        setModalEliminar(true);
        setSelectOrder({ ...empleadoItem });
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

    const busquedaValuePedido = (e) => {
        setBusqueda(e?.target?.value);
    }

    const barraBusquedaPedido = () => {
        
    }

    useEffect(() => {
        getOrder();
    }, [])

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper}>
                <Typography component="h2" variant="h5" className="titulos">
                    Lista de pedidos
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        type="submit"  
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                        onClick={abrirModInsertar} > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar pedido
                    </Button>

                    <DialogPedido
                        isOpen={modalInsertar}
                        onClose={cerrarModInsertar}
                        modoEdicion={modoEdicion}
                        formulario={formulario}
                        cliente={cliente}
                        empleado={empleado}
                    />

                    <ConfirmarEliminarPedido
                        abrir={modalEliminar}
                        cerrarModal={cerrarModalEliminar}
                        order={selectOrder}
                        deleteOrder={deleteOrder}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValuePedido} margin="dense" variant="outlined" fullWidth label="Ingresar nombre" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaPedido } >
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
                                    <TableCell align="left" > Fecha venta </TableCell>
                                    <TableCell align="left" > Valor </TableCell>
                                    <TableCell align="left" > Estado </TableCell>
                                    <TableCell align="left" > Cliente </TableCell>
                                    <TableCell align="left" > Empleado </TableCell>
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    displayData?.length > 0 ? (
                                        displayData?.map(resp => (
                                            <TableRow key={resp?.idPedido}>
                                                <TableCell align="left" > {resp?.idPedido} </TableCell>
                                                <TableCell align="left" > {new Date(resp?.fechaVentaPedido).toLocaleDateString()} </TableCell>
                                                <TableCell align="left" > {resp?.montoFinalPedido} </TableCell>
                                                <TableCell align="left" > {resp?.estadoPedido} </TableCell>
                                                <TableCell align="left" > {resp?.cliente?.nombres} {resp?.cliente?.apellidos} </TableCell>
                                                <TableCell align="left" > {resp?.empleado?.nombres} {resp?.empleado?.apellidos} </TableCell>
                                                <TableCell align="left" > 
                                                    <IconButton onClick={ () => editarValor(resp) } >
                                                        <EditIcon style={Style.iconoEdit}/>
                                                    </IconButton>
                                                    <IconButton onClick={ () => abrirModalEliminar(resp)}>
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
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > Cargando... </TableCell>
                                            <TableCell align="left" > 
                                                <IconButton onClick={ () => editarValor() } >
                                                    <EditIcon style={Style.iconoEdit}/>
                                                </IconButton>
                                                <IconButton onClick={ () => abrirModalEliminar()}>
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

export default Pedidos;
