import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { extendTheme as extendedJoy } from "@mui/joy";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { BorderBottom } from "@mui/icons-material";
export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance with light mode set explicitly.
const joyTheme = extendedJoy({
  components: {
    JoyListItemButton: {
      styleOverrides: {
        root: {
          fontSize: 18,
            fontFamily: "Uber-Medium",
            color: "#4E4E4E",
          "&&.Mui-selected, &&.Mui-selected:hover": {
            backgroundColor: "#EEF1FF",
            color: "#5068EB",
            fontSize: 18,
            fontFamily: "Uber-Medium"
          },
        },
      },
    },
  },
});
const materialTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: '#fff',
          border: '0px solid #ccc',
          borderRadius: '20px',
          '&:hover': {
            borderColor: '#b3b3b3',
            '&:before': { // Eliminar borderBottom en hover
              borderBottom: '0px !important',
            },
          },
          '&.Mui-focused': {
            borderColor: '#3f51b5',
            '&:before': { // Eliminar borderBottom cuando está enfocado
              borderBottom: '0px !important',
            },
            '&:after': { // Mantener coherente el estilo cuando está enfocado
              borderBottom: '0px !important',
            },
          },
          '&:before': { // Asegurar que no hay borderBottom en estado normal
            borderBottom: '0px solid transparent',
          },
          '&:after': { // Asegurar que no hay borderBottom en estado normal
            borderBottom: '0px solid transparent',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: 'Uber-Medium',
          fontSize: '1rem',
          background: '#f5f5f5',
          borderRadius: '10px',
          paddingLeft: 2.4,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Uber-Medium',
          paddingLeft: 1,
          fontSize: "18px"
        },
      },
    },
  },
});

export const theme = {
  material: materialTheme,
  joy: joyTheme,
};
export default theme;
