import { createMuiTheme } from '@material-ui/core/styles';
import { esES } from "@material-ui/core/locale";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#768fff", //hover
            main: "#2962ff",  //color principal
            dark: "#0039cb",  //color oscuro
            contrastText: "#ffffff",  //color texto
        },
        
    },
    esES
});

export default theme;