import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { extendTheme } from "@mui/joy";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance with light mode set explicitly.
const theme = extendTheme({
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

export default theme;
