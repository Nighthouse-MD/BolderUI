import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
// A custom theme for this app
const theme = createTheme({
    typography: {
        "fontFamily": ` -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
        Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#61dafb',
            light: '#61dafb',
            dark: '#21a1c4',
        },
        secondary: {
            main: '#b5ecfb',
            light: '#61dafb',
            dark: '#21a1c4',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#282c34',
        },
    },
    overrides: {
        MuiPaper: {
            root: {
                padding: '20px 10px',
                margin: '10px',
                backgroundColor: '#5d737e'
            },
        },
        MuiButton: {
            root: {
                margin: '5px',
            },
        },
    },
});
export default theme;