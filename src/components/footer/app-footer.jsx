import React from 'react'
import Style from '../../style/style';
import { Divider, Grid } from '@material-ui/core';


const AppFooter = () => {
    return (
        <div>
           <Grid container  style={Style.footer} >
                <Divider/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start"  >
                    <p style={Style.footerParrafo}>
                        <b> &copy; Copyright 2021 ANGEE Tienda del peluquero.</b> Todos los derechos reservados
                    </p>
                </Grid>
           </Grid>
        </div>
    
    )
}

export default AppFooter;