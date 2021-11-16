import React, {useState, useEffect} from 'react';
import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Button, Icon} from '@material-ui/core';
import Style from '../../style/style';
import DialogEmpleado from './dialog-empleado';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmarEliminarEmpleado from './eliminar-empleado';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactPaginate from 'react-paginate';
import Loading from '../loading/loading';
import {guardarEmpleado, obtenerEmpleado} from '../../actions/empleado-action';
import { useStateValue } from '../../context/store';
import Alert from '@material-ui/lab/Alert';

const Empleados = () => {

    const [respData, setRespData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [selectEmpleado, setSelectEmpleado] = useState()
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage] = useState(10);
    const [loading, setloading] = useState(false);
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
            .email("el correo no es valido")
            .required('Este campo es obligatorio'),
        comisionEmpleado: Yup.string()
           .nullable(), 
        salarioEmpleado: Yup.string()
           .required("Este campo es obligatorio"),
        segSocEmpleado: Yup.string()
            .required("Este campo es obligatorio")
    });

    const formulario = useFormik({
        initialValues: {
            salarioEmpleado : '',
            segSocEmpleado : '',
            comisionEmpleado : '',
            nombres : '',
            apellidos : '',
            direccion : '',
            telefono : '',
            correo : '', 
            documento : '',
        },
        onSubmit: (values) => {
            modoEdicion ? editarCliente(values) : registrarEmpleado(values);
            
            limpiarCampos();
        },
        validationSchema: validationSchema,
    });
    
    const getEmployes = () =>{
        setloading(true);
        obtenerEmpleado().then(response => {
            setRespData(response?.data);
            setloading(false);
            //console.log(response)
        }).catch(error => {
            setloading(false);
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                  open: true,
                  mensaje: <Alert severity="error">Error consultando los datos!</Alert>,
                },
            });
        });
    }
    useEffect(() => {
        getEmployes();
     }, [])

    const registrarEmpleado = () => {
        console.log(formulario?.values)
        guardarEmpleado(formulario?.values).then(response => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success">Los datos se almacenaron correctamente</Alert>,
                },
            });
            limpiarCampos();
            getEmployes();
        }).catch(error => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                  open: true,
                  mensaje: <Alert severity="error">Se encontraron fallos al tratar de guardar los datos!</Alert>,
                },
            });
        })
        //setRespData(formulario.values);
     }
     
     const limpiarCampos = () => {
         formulario?.resetForm();
     }
 
     const editarValor = (resp) => {
         setModoEdicion(true)
         formulario?.setValues({...resp});
         abrirModInsertar();
     }

     const editarCliente = () => {

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
         setSelectEmpleado({ ...empleadoItem });
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
 
     const busquedaValueEmpleado = (e) => {
         setBusqueda(e?.target?.value);
     }
 
     const barraBusquedaEmpleado = () => {
         
     }
 
     

    return (
        <Container maxWidth="xl" style={Style.container}>
            <div style={Style.paper}>
                <Typography component="h2" variant="h5" className="titulos">
                    Lista de empleados
                </Typography>
                <Grid container justify="flex-start">
                    <Button 
                        type="submit"  
                        variant="contained" 
                        color="primary" 
                        style={Style.boton} 
                        onClick={abrirModInsertar} > 
                        <Icon style={Style.iconBoton} >add_circle_outlined</Icon> Agregar empleado
                    </Button>

                    <DialogEmpleado
                        isOpen={modalInsertar}
                        onClose={cerrarModInsertar}
                        modoEdicion={modoEdicion}
                        formulario={formulario}
                    />

                    <ConfirmarEliminarEmpleado
                        abrir={modalEliminar}
                        cerrar={cerrarModalEliminar}
                        empleado={selectEmpleado}
                    />
                </Grid>

                <Grid container style={{paddingTop:"10px", paddingBottom:"10px"}} >
                    <Grid item  md={6}>
                        <TextField type="search" name="names" value={busqueda} onChange={busquedaValueEmpleado} margin="dense" variant="outlined" fullWidth label="Ingresar nombre" />
                    </Grid>
                    <Grid item  md={2} className="iconoBusqueda">
                        <IconButton onClick={ barraBusquedaEmpleado } >
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
                                    <TableCell align="left" > Salario </TableCell>
                                    <TableCell align="left" > Seguro </TableCell>
                                    <TableCell align="left" > Comision </TableCell>
                                    <TableCell align="left" ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    displayData?.length > 0 ? (
                                        displayData?.map(resp => (
                                            <TableRow key={resp?.idEmployee}>
                                                <TableCell align="left" > {resp?.idEmpleado} </TableCell>
                                                <TableCell align="left" > {resp?.nombres} </TableCell>
                                                <TableCell align="left" > {resp?.apellidos} </TableCell>
                                                <TableCell align="left" > {resp?.documento} </TableCell>
                                                <TableCell align="left" > {resp?.telefono} </TableCell>
                                                <TableCell align="left" > {resp?.direccion} </TableCell>
                                                <TableCell align="left" > {resp?.correo} </TableCell>
                                                <TableCell align="left" > {resp?.salarioEmpleado} </TableCell>
                                                <TableCell align="left" > {resp?.segSocEmpleado} </TableCell>
                                                <TableCell align="left" > {resp?.comisionEmpleado} </TableCell>
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

export default Empleados;
