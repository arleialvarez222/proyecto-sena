import React, {useState, useEffect} from 'react';
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Button, Icon} from '@material-ui/core';
import Style from '../../style/style';
import AgregarProducto from './agregar-producto';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import EliminarProducto from './eliminar-producto';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactPaginate from 'react-paginate';
import Loading from '../loading/loading';
import { obtenerProductos } from '../../actions/product-action';


const Productos = () => {

    const [respData, setRespData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [selectProducto, setSelectProducto] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [loading, setloading] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    const validationSchema = Yup.object({
        nombre: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        descripcion: Yup.string()
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        proveedor: Yup.string() 
        .min(3, 'Minimo 3 carácteres')
        .max(25, 'Maximo 25 carácteres')
        .required('Este campo es obligatorio'),
        valor: Yup.string() 
        .required('Este campo es obligatorio'),
    });

    const formulario = useFormik({
        initialValues: {
            nombre: '',
            valor     : '',
            descripcion : '',
            proveedor : '',
        },
        onSubmit: (values) => {
            registrarEmpleado(values);
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });

    const getProducts = () =>{
        setloading(true);
        obtenerProductos().then(response => {
            setTimeout(() => {
                setRespData(response?.data);
                setloading(false);
            }, 1000);
        }).catch(error => {
            console.log(error);
        });
    } 

    const registrarEmpleado = () => {
       setRespData(formulario.values);
    }
    
    const limpiarCampos = () => {
        formulario?.resetForm();
    }

    const editarValor = (resp) => {
        setModoEdicion(true)
        formulario?.setValues({...resp});
        abrirModInsertar();
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
        setSelectProducto({ ...empleadoItem });
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

    const busquedaValueProducto = (e) => {
        setBusqueda(e?.target?.value);
    }

    const barraBusquedaProducto = () => {
        
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper}>
                <Typography component="h2" variant="h5" className="titulos">
                    Lista de productos
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        type="submit"  
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                        onClick={abrirModInsertar} > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar producto
                    </Button>

                    <AgregarProducto
                        isOpen={modalInsertar}
                        onClose={cerrarModInsertar}
                        modoEdicion={modoEdicion}
                        formulario={formulario}
                    />

                    <EliminarProducto
                        abrir={modalEliminar}
                        cerrar={cerrarModalEliminar}
                        producto={selectProducto}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValueProducto} margin="dense" variant="outlined" fullWidth label="Ingresar nombre" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaProducto } >
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
                                    <TableCell align="left" > Valor producto </TableCell>
                                    <TableCell align="left" > Descripción </TableCell>
                                    {/* <TableCell align="left" > Proveedor </TableCell> */}
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    displayData?.length > 0 ? (
                                        displayData?.map(resp => (
                                            <TableRow key={resp?.idProducto}>
                                                <TableCell align="left" > {resp?.idProducto} </TableCell>
                                                <TableCell align="left" > {resp?.nombreProducto} </TableCell>
                                                <TableCell align="left" > {resp?.valorProducto} </TableCell>
                                                <TableCell align="left" > {resp?.describProducto} </TableCell>
                                                {/* <TableCell align="left" > {resp?.email} </TableCell> */}
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

export default Productos;
