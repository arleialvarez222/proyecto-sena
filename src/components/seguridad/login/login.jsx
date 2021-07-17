import React from 'react';
import { Button, Container, TextField, Typography, Grid } from '@material-ui/core'
import Style  from '../../../style/style';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const Login = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string() 
        .email('Verificar e-mail')
        .required('Este campo es obligatorio'),
        password: Yup.string() 
        .min(6, 'Debe contener almenos 6 caracteres')
        .required('Este campo es obligatorio'),
    });

    const usuario = useFormik({
        initialValues: {
            email           : '',
            password        : '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: validationSchema
    });

    return (
        <div>
            <Container component="main" maxWidth="xs" justify="center" style={Style.login} className="login" > 
                <div>
                    <Grid container justify="center" alignItems="center" >
                        <Typography component="h1" variant="h5" className="titulos" color="primary">
                            iniciar sesion
                        </Typography>
                    </Grid>
                    <form onSubmit={usuario.handleSubmit}>
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item xs={12} md={12}>
                                <TextField 
                                    type="email"
                                    name="email" 
                                    value={usuario.values.email} 
                                    onChange={usuario.handleChange} 
                                    variant="outlined" 
                                    label="E-mail"  
                                    fullWidth     
                                    margin="dense" 
                                    error={usuario.touched.email && Boolean(usuario.errors.email)} 
                                    helperText={usuario.touched.email && usuario.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <TextField 
                                    type="password" 
                                    name="password" 
                                    value={usuario.values.password} 
                                    onChange={usuario.handleChange}  
                                    variant="outlined" 
                                    label="Password"  
                                    fullWidth 
                                    margin="dense" 
                                    error={usuario.touched.password && Boolean(usuario.errors.password)} 
                                    helperText={usuario.touched.password && usuario.errors.password} 
                                />
                            </Grid>
                        </Grid>
                        <Grid className="imputsLogin">
                            <Grid container>
                                <Button 
                                    type="submit" 
                                    fullWidth 
                                    variant="contained" 
                                    color="primary" 
                                    style={Style.submit} > Ingresar
                                </Button>
                            </Grid>

                            <Grid container className="btnRegistrar">
                                <Button 
                                    component={Link}
                                    to="/registro"
                                    fullWidth 
                                    variant="outlined" 
                                    color="primary" 
                                    style={Style.submit} > Registrate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container> 
        </div>
    )
}

export default Login;
