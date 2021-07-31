import { createTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors'

const theme = createTheme({
    typography: {
        fontFamily: [
            'montserrat',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: teal[500]
        },
        secondary: {
            main: red[400]
        },
        error: {
            main: red[400]
        }
    },
    overrides: {
        MuiSelect: {
          select: {
            "&:focus": {
              backgroundColor: "transparent"
            }
          }
        }
      }
});

export default theme;