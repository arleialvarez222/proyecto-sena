import React from 'react';
import { Container, Grid, Typography, TextField, Button, Icon } from '@material-ui/core';
import Style  from '../../../style/style';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import { useStateValue } from '../../../context/store';
import Alert from '@material-ui/lab/Alert';
import { registrarUsuario } from '../../../actions/user-action';


const Registro = () => {
    const [ {openSnackbar}, dispatch] = useStateValue();

    const lowerCase = /(?=.*[a-z])/
    const upperCase = /(?=.*[A-Z])/
    const numeric = /(?=.*[0-9])/
    const simbol = /(?=.*[!@#$%^&*])/

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(3, 'Minimo 3 carácteres')
            .max(25, 'Maximo 25 carácteres')
            .required('Este campo es obligatorio'),
        lastName: Yup.string() 
            .min(3, 'Minimo 3 carácteres')
            .max(25, 'Maximo 25 carácteres')
            .required('Este campo es obligatorio'),
        email: Yup.string() 
            .email('E-mail no es válido')
            .required('Este campo es obligatorio'),
        userName: Yup.string() 
            .min(3, 'Minimo 3 carácteres')
            .max(25, 'Maximo 25 carácteres')
            .required('Este campo es obligatorio'),
        password: Yup.string() 
            .min(6, 'Debe contener almenos 6 carácteres')
            .matches(lowerCase, 'ingresa al menos una minúscula')
            .matches(upperCase, 'ingresa al menos una mayúscula')
            .matches(numeric, 'ingresa al menos un número')
            .matches(simbol, 'ingresa al menos un simbolo')
            .required('Este campo es obligatorio')
            .oneOf([Yup.ref("confirmPassword")], "Las contraseñas no son iguales"),
        confirmPassword: Yup.string() 
            .min(6, 'Debe contener almenos 6 caracteres')
            .required('Este campo es obligatorio')
            .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
    });

    const usuario = useFormik({
        initialValues: {
            firstName       : '',
            lastName        : '',
            email           : '',
            userName        : '',
            password        : '',
            confirmPassword : '',
            clientURI       :  'Register of user'
        },
        onSubmit: (values) => {
            registrarUsuarioBoton(values);
        },
        validationSchema: validationSchema
    });

    const verificarRegistro = (error) =>{
        if(error?.data === "Another User is already registered with that email."){
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje: <Alert severity="error">Este correo ya esta en uso, ingresa un correo nuevo!!</Alert>,
                },
            });
        }else if(error?.data === "Another user is already registered with that username."){
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje: <Alert severity="error">El nomnbre de usuario ya esta en uso!!</Alert>,
                },
            });
        } else{
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                open: true,
                mensaje: <Alert severity="error">Los datos no se guardaron... verifica los campos!!</Alert>,
                },
            });
        }
}

    const registrarUsuarioBoton = () => {
        registrarUsuario(usuario?.values).then(response => {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje:  <Alert severity="success">El usuario se a creado con éxito</Alert>,
                },
            });
        }).catch(error => {
            verificarRegistro(error);
        }); 
    }

    return (
        <Container component="main" maxWidth="xs" justify="center" className="registros">
            <div >
               <Grid container justify="center" alignItems="center" >
                    <Typography component="h2" variant="h5" className="titulos" color="primary">
                        Registro de usuario
                    </Typography>
               </Grid>
                <form onSubmit={usuario.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} >
                            <TextField
                                name="firstName"
                                value={usuario.values.firstName}
                                onChange={usuario.handleChange}
                                variant="outlined"
                                margin="dense" 
                                fullWidth
                                label="Nombre" 
                                error={usuario.touched.firstName && Boolean(usuario.errors.firstName)} 
                                helperText={usuario.touched.firstName && usuario.errors.firstName} 
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                name="lastName"
                                value={usuario.values.lastName}
                                onChange={usuario.handleChange}
                                variant="outlined"
                                margin="dense" 
                                fullWidth
                                label="Apellido" 
                                error={usuario.touched.lastName && Boolean(usuario.errors.lastName)} 
                                helperText={usuario.touched.lastName && usuario.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                type="email"
                                name="email"
                                value={usuario.values.email}
                                onChange={usuario.handleChange}
                                variant="outlined"
                                margin="dense" 
                                fullWidth
                                label="E-mail" 
                                error={usuario.touched.email && Boolean(usuario.errors.email)} 
                                helperText={usuario.touched.email && usuario.errors.email} 
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                name="userName"
                                value={usuario.values.userName}
                                onChange={usuario.handleChange}
                                variant="outlined"
                                margin="dense" 
                                fullWidth
                                label="Usuario" 
                                error={usuario.touched.userName && Boolean(usuario.errors.userName)} 
                                helperText={usuario.touched.userName && usuario.errors.userName}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                type="password"
                                name="password"
                                value={usuario.values.password}
                                onChange={usuario.handleChange}
                                variant="outlined"
                                margin="dense" 
                                id="password"
                                fullWidth
                                label="Contraseña"
                                error={usuario.touched.password && Boolean(usuario.errors.password)} 
                                helperText={usuario.touched.password && usuario.errors.password} 
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                type="password"
                                name="confirmPassword"
                                value={usuario.values.confirmPassword}
                                onChange={usuario.handleChange}
                                variant="outlined"
                                margin="dense"
                                id="confirmPassword" 
                                fullWidth
                                label="Confirmar contraseña" 
                                error={usuario.touched.confirmPassword && Boolean(usuario.errors.confirmPassword)} 
                                helperText={usuario.touched.confirmPassword && usuario.errors.confirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid className="btnRegistrar" >
                            <Button 
                                type="submit"  
                                variant="contained"
                                color="primary" 
                                fullWidth 
                                style={Style.btnNewCredit} > 
                                <Icon style={Style.iconBoton} >save</Icon> Guardar
                            </Button>
                        </Grid>

                        <Grid  className="btnInSesion">
                            <Button 
                                component={Link}
                                to="/login"
                                fullWidth 
                                variant="outlined" 
                                color="primary"
                                style={Style.inicioSesion} > Iniciar sesión
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
       </Container>
    )
}

export default withRouter(Registro);
